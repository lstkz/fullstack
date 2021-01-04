import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { TaskPage, TaskPageProps } from 'src/features/task/TaskPage';

export default function TaskPageWrapper(props: TaskPageProps) {
  return <TaskPage {...props} key={props.task.id} />;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = createSSRClient(ctx);
  const moduleId = ctx.query.id as string;
  const taskId = Number(ctx.query.taskId as string);
  const task = await api.module_getTask(moduleId, taskId);
  const { isReady } = await api.vm_assignVM();
  let vmUrl: string | null = null;
  if (isReady) {
    const ret = await api.vm_prepareFolder(moduleId, taskId);
    vmUrl = ret.url;
  }

  const detailsHtml = await (await fetch(task.htmlUrl)).text();
  return {
    props: {
      task,
      isReady,
      vmUrl,
      detailsHtml,
    },
  };
};
