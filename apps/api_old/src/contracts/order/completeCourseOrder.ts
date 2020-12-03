import { S } from 'schema';
import * as R from 'remeda';
import { randomUniqString } from '../../common/helper';
import { APP_BASE_URL } from '../../config';
import { dispatch } from '../../dispatch';
import { CourseActivationCodeEntity } from '../../entities/CourseActivationCodeEntity';
import { CourseEntity } from '../../entities/CourseEntity';
import { EventEntity } from '../../entities/EventEntity';
import { OrderEntity } from '../../entities/OrderEntity';
import {
  createContract,
  createEventBinding,
  createTransaction,
} from '../../lib';
import { _createUser } from '../user/_createUser';

export const completeCourseOrder = createContract('order.completeCourseOrder')
  .params('orderId')
  .schema({
    orderId: S.string(),
  })
  .fn(async orderId => {
    const order = await OrderEntity.getByKey({ orderId });
    if (order.product.type !== 'course') {
      return;
    }
    const course = await CourseEntity.getByKey({
      courseId: order.product.courseId,
    });

    const existing = await CourseActivationCodeEntity.getAllByOrderId(orderId);
    const existingMap = R.indexBy(existing, x => x.index);
    const courseActivationCodes = await Promise.all(
      R.range(1, order.quantity + 1).map(async index => {
        if (existingMap[index]) {
          return existingMap[index];
        }
        const t = createTransaction();
        EventEntity.addToTransaction(
          t,
          ['completeCourseOrder', orderId, index].join(':')
        );
        const code = randomUniqString();
        const activation = new CourseActivationCodeEntity({
          code,
          courseId: course.courseId,
          orderId,
          index,
        });
        t.insert(activation);
        await t.commit();
        return activation;
      })
    );

    const getUrl = (code: CourseActivationCodeEntity) =>
      `${APP_BASE_URL}/register?code=${code.code}`;
    const commonMailParams = {
      subject: `👏 Kupiłeś kurs: ${course.name}`,
      to: order.customer.email,
    };
    if (courseActivationCodes.length === 1) {
      await dispatch({
        type: 'SendEmailEvent',
        payload: {
          ...commonMailParams,
          template: {
            name: 'ButtonAction',
            params: {
              header: 'Załóż konto na platformie',
              description:
                'Dziękujemy za zakup kursu. Kliknij na poniższy link, żeby założyć konto.',
              buttonText: 'Załóż konto',
              buttonUrl: getUrl(courseActivationCodes[0]),
            },
          },
        },
      });
    } else {
      await dispatch({
        type: 'SendEmailEvent',
        payload: {
          ...commonMailParams,
          template: {
            name: 'MultiLinks',
            params: {
              header: 'Kupiłeś wiele dostępów do platformy',
              description:
                'Dziękujemy za zakup kursu. Poniżej znajdziesz listę linków do założenia kont:',
              links: courseActivationCodes.map(getUrl),
            },
          },
        },
      });
    }
  });

export const completeCourseOrderEvent = createEventBinding({
  type: 'OrderPaidEvent',
  handler: async payload => {
    await completeCourseOrder(payload.payload.orderId);
  },
});
