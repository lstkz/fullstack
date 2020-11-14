export interface FileUpload {
  name: string;
  path: string;
  content: Buffer;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  promoPrice: number;
  price: number;
  promoEnds: Date;
}

export interface CourseTask {
  name: string;
}

export interface TaskInfo {
  task: CourseTask;
  week: number;
  id: number;
  taskDir: string;
  uniqName: string;
  detailsPath: string;
  distFileName: string;
  distFilePath: string;
  sourceTarPath: string;
}
