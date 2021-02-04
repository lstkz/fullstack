import { config } from 'config';
import { S } from 'schema';
import { OrderInvoiceCollection } from '../../collections/OrderInvoice';
import { SubscriptionOrderCollection } from '../../collections/SubscriptionOrder';
import { SubscriptionPlanCollection } from '../../collections/SubscriptionPlan';
import { UserCollection, UserModel } from '../../collections/User';
import { getCurrentDate } from '../../common/helper';
import { createInvoice, sendInvoiceByEmail } from '../../common/invoice';
import { createContract, createTaskBinding } from '../../lib';
import { nextSeq } from '../misc/nextSeq';

async function _ensureInvoiceClientId(user: UserModel) {
  if (user.invoiceClientId) {
    return user.invoiceClientId;
  }
  const invoiceClientId = await nextSeq('INVOICE_CLIENT_ID');
  const ret = await UserCollection.findOneAndUpdate(
    {
      _id: user._id,
      invoiceClientId: { $exists: false },
    },
    {
      $set: {
        invoiceClientId,
      },
    }
  );
  if (ret.value) {
    return invoiceClientId;
  }
  const latestUser = await UserCollection.findByIdOrThrow(user._id);
  if (!latestUser.invoiceClientId) {
    throw new Error('Cannot create invoiceClientId');
  }
  return latestUser.invoiceClientId;
}

export const createOrderInvoice = createContract('invoice.createOrderInvoice')
  .params('orderId')
  .schema({
    orderId: S.string(),
  })
  .fn(async orderId => {
    if (!config.fakturownia.enabled) {
      return;
    }
    const order = await SubscriptionOrderCollection.findByIdOrThrow(orderId);
    const { customer } = order;
    if (!customer.companyVat) {
      return;
    }
    const user = await UserCollection.findByIdOrThrow(order.userId);
    let invoice = await OrderInvoiceCollection.findOne({
      orderId,
    });
    const plan = await SubscriptionPlanCollection.findByIdOrThrow(order.planId);
    if (!invoice) {
      const invoiceClientId = await _ensureInvoiceClientId(user);
      const invoiceNo = await nextSeq(`INVOICE_NO:${invoiceClientId}`);
      invoice = {
        _id: `${config.fakturownia.numberPrefix}/${invoiceClientId}/${invoiceNo}`,
        externalId: null,
        orderId,
        userId: user._id,
        createdAt: getCurrentDate(),
        isSent: false,
      };
      await OrderInvoiceCollection.insertOne(invoice);
    }
    if (!invoice.externalId) {
      const createdInvoice = await createInvoice({
        kind: 'vat',
        number: invoice._id,
        ...config.fakturownia.sellerValues,
        buyer_name: customer.companyName!,
        buyer_tax_no: customer.companyVat,
        buyer_city: customer.city,
        buyer_post_code: customer.postalCode,
        buyer_street: customer.address,
        buyer_email: user.email,
        positions: [
          {
            name: plan.name,
            quantity: 1,
            tax: order.price.vatRate,
            total_price_gross: order.price.total,
          },
        ],
      });
      invoice.externalId = createdInvoice.id;
      await OrderInvoiceCollection.update(invoice, ['externalId']);
    }
    if (!invoice.isSent) {
      await sendInvoiceByEmail(invoice.externalId);
      invoice.isSent = true;
      await OrderInvoiceCollection.update(invoice, ['isSent']);
    }
  });

export const createOrderInvoiceTask = createTaskBinding({
  type: 'CreateOrderInvoice',
  handler: async (_, event) => {
    await createOrderInvoice(event.orderId);
  },
});
