import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { api } from 'src/services/api';

const REPORT_INTERVAL = 60 * 1000;

export function useReportPracticeTime(
  task: ModuleTaskDetails,
  isEnabled: boolean
) {
  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }
    const report = () =>
      api
        .module_reportPracticeTime(task.moduleId, task.id)
        .catch(console.error);
    report();
    const reportIntervalId = setInterval(report, REPORT_INTERVAL);
    return () => {
      clearInterval(reportIntervalId);
    };
  }, [isEnabled]);
}
