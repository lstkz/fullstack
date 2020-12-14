import fetch from 'node-fetch';

const VM_PORT = 17775;

interface SetupVMOptions {
  instanceId: string;
  domainName: string;
  cert: string;
  certKey: string;
}

export async function setupVM(options: SetupVMOptions) {
  const { instanceId, ...params } = options;
  const res = await fetch(`http://${params.domainName}:${VM_PORT}/setup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-instance-id': instanceId,
    },
    body: JSON.stringify(params),
  });
  if (res.status !== 200) {
    throw new Error('Failed to setup vm, return code: ' + res.status);
  }
}
