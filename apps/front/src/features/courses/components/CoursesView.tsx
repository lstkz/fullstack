import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { useCoursesModule } from '../module';

export function CoursesView() {
  useCoursesModule();

  return <Dashboard>Feature courses</Dashboard>;
}
