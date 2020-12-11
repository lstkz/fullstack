import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { TaskPage } from 'src/features/task/TaskPage';

export default TaskPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = createSSRClient(ctx);
  const task = await api.module_getTask(
    ctx.query.id as string,
    Number(ctx.query.taskId as string)
  );
  return {
    props: {
      task,
    },
  };
};
