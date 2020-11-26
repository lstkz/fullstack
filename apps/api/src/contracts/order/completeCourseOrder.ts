import { S } from 'schema';
import { randomUniqString } from '../../common/helper';
import { APP_BASE_URL } from '../../config';
import { dispatch } from '../../dispatch';
import { CourseActivationCodeEntity } from '../../entities/CourseActivationCodeEntity';
import { CourseEntity } from '../../entities/CourseEntity';
import { OrderEntity } from '../../entities/OrderEntity';
import { createContract, createEventBinding } from '../../lib';
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
    if (order.quantity === 1) {
      const code = randomUniqString();
      const activation = new CourseActivationCodeEntity({
        code,
        courseId: course.courseId,
        orderId,
      });
      await activation.insert();
      dispatch({
        type: 'SendEmailEvent',
        payload: {
          subject: `👏 Kupiłeś kurs: ${course.name}`,
          to: order.customer.email,
          template: {
            name: 'ButtonAction',
            params: {
              header: 'Załóż konto na platformie',
              description:
                'Dziękujemy za zakup kursu. Kliknij na poniższy link, żeby założyć konto.',
              buttonText: 'Załóż konto',
              buttonUrl: `${APP_BASE_URL}/register?code=${code}`,
            },
          },
        },
      });
    } else {
      throw new Error('TODO');
    }
  });

export const completeCourseOrderEvent = createEventBinding({
  type: 'OrderPaidEvent',
  handler: async payload => {
    await completeCourseOrder(payload.payload.orderId);
  },
});
