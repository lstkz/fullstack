import { ADMIN_TOKEN } from '../../src/config';
import { updateCourse } from '../../src/contracts/course/updateCourse';
import { CourseEntity } from '../../src/entities/CourseEntity';
import { CourseLessonEntity } from '../../src/entities/CourseLessonEntity';
import { CourseTaskEntity } from '../../src/entities/CourseTaskEntity';
import { execContract, resetDb } from '../helper';

beforeEach(async () => {
  await resetDb();
});

function _getCourse(id: string) {
  return {
    id,
    name: `name ${id}`,
    description: `description ${id}`,
    promoPrice: 1000,
    price: 3000,
    promoEnds: new Date('2020-01-01T00:00:00.000Z'),
  };
}

function _getLesson(id: number) {
  return {
    id,
    name: `lesson ${id}`,
    week: 1,
    sources: [
      {
        resolution: 1080,
        s3Key: `lesson_${id}_1080.mp4`,
      },
      {
        resolution: 720,
        s3Key: `lesson_${id}_720.mp4`,
      },
    ],
  };
}

function _getTask(id: number) {
  return {
    id,
    name: `task ${id}`,
    week: 1,
    detailsS3Key: `detailsS3Key ${id}`,
    sourceS3Key: `sourceS3Key ${id}`,
  };
}

it('should update a course', async () => {
  await execContract(
    updateCourse,
    {
      course: _getCourse('c1'),
      lessons: [_getLesson(1), _getLesson(2), _getLesson(3)],
      tasks: [_getTask(1), _getTask(2)],
    },
    ADMIN_TOKEN
  );

  const [course, lessons, tasks] = await Promise.all([
    CourseEntity.getByKey({ courseId: 'c1' }),
    CourseLessonEntity.getByCourse('c1'),
    CourseTaskEntity.getByCourse('c1'),
  ]);
  expect(course).toMatchInlineSnapshot(`
    CourseEntity {
      "courseId": "c1",
      "description": "description c1",
      "entityType": "course",
      "name": "name c1",
      "price": 3000,
      "promoEnds": 1577836800000,
      "promoPrice": 1000,
    }
  `);
  expect(lessons).toMatchInlineSnapshot(`
    Array [
      CourseLessonEntity {
        "courseId": "c1",
        "courseLessonId": 1,
        "entityType": "course_lesson",
        "name": "lesson 1",
        "sources": Array [
          Object {
            "resolution": 1080,
            "s3Key": "lesson_1_1080.mp4",
          },
          Object {
            "resolution": 720,
            "s3Key": "lesson_1_720.mp4",
          },
        ],
        "week": 1,
      },
      CourseLessonEntity {
        "courseId": "c1",
        "courseLessonId": 2,
        "entityType": "course_lesson",
        "name": "lesson 2",
        "sources": Array [
          Object {
            "resolution": 1080,
            "s3Key": "lesson_2_1080.mp4",
          },
          Object {
            "resolution": 720,
            "s3Key": "lesson_2_720.mp4",
          },
        ],
        "week": 1,
      },
      CourseLessonEntity {
        "courseId": "c1",
        "courseLessonId": 3,
        "entityType": "course_lesson",
        "name": "lesson 3",
        "sources": Array [
          Object {
            "resolution": 1080,
            "s3Key": "lesson_3_1080.mp4",
          },
          Object {
            "resolution": 720,
            "s3Key": "lesson_3_720.mp4",
          },
        ],
        "week": 1,
      },
    ]
  `);
  expect(tasks).toMatchInlineSnapshot(`
    Array [
      CourseTaskEntity {
        "courseId": "c1",
        "courseTaskId": 1,
        "detailsS3Key": "detailsS3Key 1",
        "entityType": "course_task",
        "name": "task 1",
        "sourceS3Key": "sourceS3Key 1",
        "week": 1,
      },
      CourseTaskEntity {
        "courseId": "c1",
        "courseTaskId": 2,
        "detailsS3Key": "detailsS3Key 2",
        "entityType": "course_task",
        "name": "task 2",
        "sourceS3Key": "sourceS3Key 2",
        "week": 1,
      },
    ]
  `);
});

it('should update a course (update, and remove lessons and tasks)', async () => {
  await execContract(
    updateCourse,
    {
      course: _getCourse('c1'),
      lessons: [_getLesson(1), _getLesson(2), _getLesson(3)],
      tasks: [_getTask(1), _getTask(2), _getTask(3)],
    },
    ADMIN_TOKEN
  );

  await execContract(
    updateCourse,
    {
      course: {
        ..._getCourse('c1'),
        name: `updated name c1`,
        description: `updated description c1`,
        promoPrice: 1100,
        price: 3100,
        promoEnds: new Date('2030-01-01T00:00:00.000Z'),
      },
      lessons: [
        _getLesson(1),
        {
          ..._getLesson(2),
          name: 'updated lesson',
          week: 2,
          sources: [
            {
              resolution: 1080,
              s3Key: `lesson_2_1080.mp4`,
            },
            {
              resolution: 4000,
              s3Key: `lesson_2_4000.mp4`,
            },
          ],
        },
      ],
      tasks: [
        _getTask(1),
        {
          ..._getTask(2),
          name: 'updated task',
          week: 2,
          detailsS3Key: 'detailsS3Key updated',
          sourceS3Key: 'sourceS3Key updated',
        },
      ],
    },
    ADMIN_TOKEN
  );

  const [course, lessons, tasks] = await Promise.all([
    CourseEntity.getByKey({ courseId: 'c1' }),
    CourseLessonEntity.getByCourse('c1'),
    CourseTaskEntity.getByCourse('c1'),
  ]);

  expect(course).toMatchInlineSnapshot(`
    CourseEntity {
      "courseId": "c1",
      "description": "updated description c1",
      "entityType": "course",
      "name": "updated name c1",
      "price": 3100,
      "promoEnds": 1893456000000,
      "promoPrice": 1100,
    }
  `);
  expect(lessons).toMatchInlineSnapshot(`
    Array [
      CourseLessonEntity {
        "courseId": "c1",
        "courseLessonId": 1,
        "entityType": "course_lesson",
        "name": "lesson 1",
        "sources": Array [
          Object {
            "resolution": 1080,
            "s3Key": "lesson_1_1080.mp4",
          },
          Object {
            "resolution": 720,
            "s3Key": "lesson_1_720.mp4",
          },
        ],
        "week": 1,
      },
      CourseLessonEntity {
        "courseId": "c1",
        "courseLessonId": 2,
        "entityType": "course_lesson",
        "name": "updated lesson",
        "sources": Array [
          Object {
            "resolution": 1080,
            "s3Key": "lesson_2_1080.mp4",
          },
          Object {
            "resolution": 4000,
            "s3Key": "lesson_2_4000.mp4",
          },
        ],
        "week": 2,
      },
    ]
  `);
  expect(tasks).toMatchInlineSnapshot(`
    Array [
      CourseTaskEntity {
        "courseId": "c1",
        "courseTaskId": 1,
        "detailsS3Key": "detailsS3Key 1",
        "entityType": "course_task",
        "name": "task 1",
        "sourceS3Key": "sourceS3Key 1",
        "week": 1,
      },
      CourseTaskEntity {
        "courseId": "c1",
        "courseTaskId": 2,
        "detailsS3Key": "detailsS3Key updated",
        "entityType": "course_task",
        "name": "updated task",
        "sourceS3Key": "sourceS3Key updated",
        "week": 2,
      },
    ]
  `);
});
