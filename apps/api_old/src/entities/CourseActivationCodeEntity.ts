import { createBaseEntity } from '../lib';

export interface CourseActivationCodeKey {
  code: string;
  orderId: string;
}

export interface CourseActivationCodeProps extends CourseActivationCodeKey {
  courseId: string;
  index: number;
}

const BaseEntity = createBaseEntity('course_activation_code')
  .props<CourseActivationCodeProps>()
  .key<CourseActivationCodeKey>(key => {
    return {
      pk: `$:${key.code}`,
      sk: `$:${key.orderId}`,
    };
  })
  .mapping({
    index: 'data_n',
  })
  .build();

export class CourseActivationCodeEntity extends BaseEntity {
  static getAllByOrderId(orderId: string) {
    return this.queryAll({
      key: {
        sk: this.createKey({ code: '-1', orderId }).sk,
        data_n: null,
      },
    });
  }

  static async getByCodeOrNull(code: string) {
    const result = await this.queryAll({
      key: {
        pk: this.createKey({ code, orderId: '-1' }).pk,
      },
    });
    return result[0] ?? null;
  }
}
