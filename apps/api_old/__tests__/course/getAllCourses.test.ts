import { getAllCourses } from '../../src/contracts/course/getAllCourses';
import { makeAdmin } from '../../src/contracts/user/makeAdmin';
import { CourseAccessEntity } from '../../src/entities/CourseAccessEntity';
import { CourseEntity } from '../../src/entities/CourseEntity';
import { execContract, resetDb } from '../helper';
import { registerSampleUsers } from '../seed-data';

function _getCourse(courseId: string) {
  return {
    courseId,
    name: `name ${courseId}`,
    description: `description ${courseId}`,
    promoPrice: 1000,
    price: 3000,
    promoEnds: new Date('2020-01-01T00:00:00.000Z').getTime(),
  };
}

beforeEach(async () => {
  await resetDb();
  await registerSampleUsers();
  await makeAdmin('1');
  await Promise.all([
    new CourseEntity(_getCourse('c1')).insert(),
    new CourseEntity(_getCourse('c2')).insert(),
    new CourseAccessEntity({
      courseId: 'c1',
      userId: '1',
    }).insert(),
  ]);
});

it('should return courses for user1', async () => {
  const ret = await execContract(getAllCourses, {}, 'user1_token');

  await expect(ret).toMatchInlineSnapshot(`
          Array [
            Object {
              "description": "description c1",
              "hasAccess": true,
              "id": "c1",
              "name": "name c1",
              "price": 3000,
              "promoEnds": "2020-01-01T00:00:00.000Z",
              "promoPrice": 1000,
            },
            Object {
              "description": "description c2",
              "hasAccess": false,
              "id": "c2",
              "name": "name c2",
              "price": 3000,
              "promoEnds": "2020-01-01T00:00:00.000Z",
              "promoPrice": 1000,
            },
          ]
        `);
});

it('should return courses for user2', async () => {
  const ret = await execContract(getAllCourses, {}, 'user2_token');

  await expect(ret).toMatchInlineSnapshot(`
          Array [
            Object {
              "description": "description c1",
              "hasAccess": false,
              "id": "c1",
              "name": "name c1",
              "price": 3000,
              "promoEnds": "2020-01-01T00:00:00.000Z",
              "promoPrice": 1000,
            },
            Object {
              "description": "description c2",
              "hasAccess": false,
              "id": "c2",
              "name": "name c2",
              "price": 3000,
              "promoEnds": "2020-01-01T00:00:00.000Z",
              "promoPrice": 1000,
            },
          ]
        `);
});

it('should return courses for anonymous', async () => {
  const ret = await execContract(getAllCourses, {}, 'user2_token');

  await expect(ret).toMatchInlineSnapshot(`
          Array [
            Object {
              "description": "description c1",
              "hasAccess": false,
              "id": "c1",
              "name": "name c1",
              "price": 3000,
              "promoEnds": "2020-01-01T00:00:00.000Z",
              "promoPrice": 1000,
            },
            Object {
              "description": "description c2",
              "hasAccess": false,
              "id": "c2",
              "name": "name c2",
              "price": 3000,
              "promoEnds": "2020-01-01T00:00:00.000Z",
              "promoPrice": 1000,
            },
          ]
        `);
});
