import { S } from 'schema';
import uuid from 'uuid';
import { CourseAccessEntity } from '../../entities/CourseAccessEntity';
import { OrderEntity } from '../../entities/OrderEntity';
import { UserEntity } from '../../entities/UserEntity';
import {
  createContract,
  createEventBinding,
  createTransaction,
} from '../../lib';

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
    const t = createTransaction();
    if (!user) {
      user = new UserEntity({
        userId: uuid(),
        email: order.customer.email,
      });
      t.insert(user);
    }
    const courseAccess = new CourseAccessEntity({
      courseId: order.product.courseId,
      userId: user.userId,
    });
    t.insert(courseAccess);
    await t.commit();
  });

export const completeCourseOrderEvent = createEventBinding({
  type: 'OrderPaidEvent',
  handler: async payload => {
    await completeCourseOrder(payload.payload.orderId);
  },
});
