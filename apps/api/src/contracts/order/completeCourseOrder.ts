import { S } from 'schema';
import uuid from 'uuid';
import { randomUniqString } from '../../common/helper';
import { CourseAccessEntity } from '../../entities/CourseAccessEntity';
import { OrderEntity } from '../../entities/OrderEntity';
import { UserEntity } from '../../entities/UserEntity';
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
    let user = await UserEntity.getUserByEmailOrNull(order.customer.email);
    if (!user) {
      user = await _createUser({
        userId: uuid(),
        email: order.customer.email,
        isVerified: true,
        password: randomUniqString(),
      });
    }
    const courseAccess = new CourseAccessEntity({
      courseId: order.product.courseId,
      userId: user.userId,
    });
    await courseAccess.insert();
  });

export const completeCourseOrderEvent = createEventBinding({
  type: 'OrderPaidEvent',
  handler: async payload => {
    await completeCourseOrder(payload.payload.orderId);
  },
});
