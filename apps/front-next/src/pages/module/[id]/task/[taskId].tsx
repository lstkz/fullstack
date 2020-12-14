import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { TaskPage } from 'src/features/task/TaskPage';

export default TaskPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = createSSRClient(ctx);
  const moduleId = ctx.query.id as string;
  const taskId = Number(ctx.query.taskId as string);
  const task = await api.module_getTask(moduleId, taskId);
  const { isReady } = await api.vm_assignVM();
  let vmUrl = '';
  if (isReady) {
    const ret = await api.vm_prepareFolder(moduleId, taskId);
    vmUrl = ret.url;
  }
  return {
    props: {
      task,
      isReady,
      vmUrl,
    },
  };
};
