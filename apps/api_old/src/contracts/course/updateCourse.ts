import { S } from 'schema';
import * as R from 'remeda';
import { CourseEntity } from '../../entities/CourseEntity';
import { createContract, createRpcBinding } from '../../lib';
import {
  differenceBy,
  intersectionBy,
  safeAssign,
  safeKeys,
} from '../../common/helper';
import { CourseLessonEntity } from '../../entities/CourseLessonEntity';
import { VideoUpload } from 'shared';
import { CourseTaskEntity } from '../../entities/CourseTaskEntity';

interface LessonUpdate {
  name: string;
  id: number;
  week: number;
  sources: VideoUpload[];
}

interface TaskUpdate {
  name: string;
  id: number;
  week: number;
  detailsS3Key: string;
  sourceS3Key: string;
}

async function _updateLessons(courseId: string, lessons: LessonUpdate[]) {
  const existingLessons = await CourseLessonEntity.getByCourse(courseId);

  const getId = (x: { id: number } | { courseLessonId: number }) =>
    'id' in x ? x.id : x.courseLessonId;
  const newLessons = differenceBy(lessons, existingLessons, getId);
  const updatedLessons = intersectionBy(lessons, existingLessons, getId);
  const removedLessons = differenceBy(existingLessons, lessons, getId);
  await Promise.all(
    newLessons.map(async lesson => {
      const newLesson = new CourseLessonEntity({
        courseId,
        courseLessonId: lesson.id,
        name: lesson.name,
        sources: lesson.sources,
        week: lesson.week,
      });
      await newLesson.insert();
    })
  );
  await Promise.all(
    updatedLessons.map(async lesson => {
      const existing = existingLessons.find(
        x => x.courseLessonId === lesson.id
      )!;
      const updateValues = R.pick(lesson, ['name', 'sources', 'week']);
      safeAssign(existing, updateValues);

      await existing.update(safeKeys(updateValues));
    })
  );
  await Promise.all(
    removedLessons.map(async lesson => {
      await lesson.delete();
    })
  );
}

async function _updateTasks(courseId: string, tasks: TaskUpdate[]) {
  const existingTasks = await CourseTaskEntity.getByCourse(courseId);

  const getId = (x: { id: number } | { courseTaskId: number }) =>
    'id' in x ? x.id : x.courseTaskId;
  const newTasks = differenceBy(tasks, existingTasks, getId);
  const updatedTasks = intersectionBy(tasks, existingTasks, getId);
  const removedTasks = differenceBy(existingTasks, tasks, getId);
  await Promise.all(
    newTasks.map(async task => {
      const newTask = new CourseTaskEntity({
        courseId,
        courseTaskId: task.id,
        name: task.name,
        detailsS3Key: task.detailsS3Key,
        sourceS3Key: task.sourceS3Key,
        week: task.week,
      });
      await newTask.insert();
    })
  );
  await Promise.all(
    updatedTasks.map(async task => {
      const existing = existingTasks.find(x => x.courseTaskId === task.id)!;
      const updateValues = R.pick(task, [
        'name',
        'detailsS3Key',
        'sourceS3Key',
        'week',
      ]);
      safeAssign(existing, updateValues);

      await existing.update(safeKeys(updateValues));
    })
  );
  await Promise.all(
    removedTasks.map(async task => {
      await task.delete();
    })
  );
}

export const updateCourse = createContract('course.updateCourse')
  .params('course', 'lessons', 'tasks')
  .schema({
    course: S.object().keys({
      id: S.string(),
      name: S.string(),
      description: S.string(),
      promoPrice: S.number(),
      price: S.number(),
      promoEnds: S.date(),
    }),
    lessons: S.array().items(
      S.object().keys({
        id: S.number(),
        name: S.string(),
        week: S.number(),
        sources: S.array().items(
          S.object().keys({
            resolution: S.number(),
            s3Key: S.string(),
          })
        ),
      })
    ),
    tasks: S.array().items(
      S.object().keys({
        id: S.number(),
        name: S.string(),
        week: S.number(),
        detailsS3Key: S.string(),
        sourceS3Key: S.string(),
      })
    ),
  })
  .fn(async (course, lessons, tasks) => {
    const courseId = course.id;
    let existingCourse = await CourseEntity.getByKeyOrNull({
      courseId,
    });
    const updateValues = {
      ...R.pick(course, ['name', 'description', 'price', 'promoPrice']),
      promoEnds: course.promoEnds.getTime(),
    };
    if (!existingCourse) {
      existingCourse = new CourseEntity({
        courseId,
        ...updateValues,
      });
      await existingCourse.insert();
    } else {
      safeAssign(existingCourse, updateValues);
      await existingCourse.update(safeKeys(updateValues));
    }
    await _updateLessons(courseId, lessons);
    await _updateTasks(courseId, tasks);
  });

export const updateCourseRpc = createRpcBinding({
  admin: true,
  signature: 'course.updateCourse',
  handler: updateCourse,
});
