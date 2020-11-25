import { S } from 'schema';
import { AppError } from '../../common/errors';
import { randomUniqString } from '../../common/helper';
import { createTPayTransaction, getTPayGroups } from '../../common/tpay';
import { API_BASE_URL, APP_BASE_URL, TPAY_RESULT_EMAIL } from '../../config';
import { CourseEntity } from '../../entities/CourseEntity';
import { OrderEntity } from '../../entities/OrderEntity';
import { createContract, createRpcBinding } from '../../lib';

export const createOrder = createContract('order.createOrder')
  .params('values')
  .schema({
    values: S.object().keys({
      group: S.number(),
      subscribeNewsletter: S.boolean().optional(),
      product: S.object().keys({
        type: S.enum().literal('course'),
        courseId: S.string(),
      }),
      customer: S.object().keys({
        email: S.string().email(),
        firstName: S.string(),
        lastName: S.string(),
        companyName: S.string().optional(),
        companyVat: S.string().optional(),
        address: S.string(),
        postalCode: S.string(),
        city: S.string(),
      }),
    }),
  })
  .returns<{ paymentUrl: string }>()
  .fn(async values => {
    const groups = await getTPayGroups();
    if (!groups.some(x => x.id === values.group)) {
      throw new AppError('Invalid group');
    }
    const orderId = randomUniqString().toUpperCase();
    const course = await CourseEntity.getByKeyOrNull({
      courseId: values.product.courseId,
    });
    if (!course) {
      throw new AppError('Course not found');
    }
    const amount =
      course.promoEnds > Date.now() ? course.promoPrice : course.price;
    const order = new OrderEntity({
      orderId,
      createdAt: Date.now(),
      amount,
      customer: values.customer,
      product: values.product,
      provider: {
        name: 'tpay',
        transactionId: null,
        paymentUrl: null,
      },
      status: 'NOT_PAID',
    });
    await order.insert();

    const tpayTransaction = await createTPayTransaction({
      crc: orderId,
      amount,
      description: `Kurs: ${course.name}`,
      name: `${values.customer.firstName} ${values.customer.lastName}`,
      email: values.customer.email,
      group: values.group,
      language: 'pl',
      merchant_description: 'Fullstack.pl',
      online: 1,
      result_email: TPAY_RESULT_EMAIL,
      result_url: `${API_BASE_URL}/rcp/order.tpayHook`,
      return_error_url: `${APP_BASE_URL}`,
      return_url: `${APP_BASE_URL}/check-order/${orderId}`,
    });
    await order.insert();
    order.provider.transactionId = tpayTransaction.id;
    order.provider.paymentUrl = tpayTransaction.url;
    await order.update(['provider']);
    return {
      paymentUrl: tpayTransaction.url,
    };
  });

export const createOrderRpc = createRpcBinding({
  public: true,
  signature: 'order.createOrder',
  handler: createOrder,
});
