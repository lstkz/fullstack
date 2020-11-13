export interface Foo {
  id: string;
  foo: string;
  bar: string;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface SubscriptionResult {
  result: 'ok' | 'already-subscribed';
}

export interface Course {
  id: string;
  name: string;
  description: string;
  promoPrice: number;
  price: number;
  promoEnds: Date;
}

export interface VideoUpload {
  resolution: number;
  s3Key: string;
}

export interface CourseLessonUpload {
  id: number;
  name: string;
  week: number;
  sources: VideoUpload[];
}
export interface CourseTaskUpload {
  id: number;
  name: string;
  week: number;
  s3Key: string;
}
