import fetch from 'node-fetch';

const VM_PORT = 17775;

interface SetupVMOptions {
  instanceId: string;
  domainName: string;
  cert: string;
  certKey: string;
}

async function _makePost(
  domainName: string,
  path: string,
  instanceId: string,
  body: any
) {
  const res = await fetch(`http://${domainName}:${VM_PORT}${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-instance-id': instanceId,
    },
    body: JSON.stringify(body),
  });
  if (res.status !== 200) {
    throw new Error('Failed to make request return code: ' + res.status);
  }
  return res.json();
}

export async function setupVM(options: SetupVMOptions) {
  const { instanceId, ...params } = options;
  await _makePost(params.domainName, '/setup', instanceId, params);
}

interface PrepareVMFolderOptions {
  instanceId: string;
  domainName: string;
  folderPath: string;
  downloadUrl: string;
  setupCommand: string;
}

export async function prepareVMFolder(options: PrepareVMFolderOptions) {
  const { domainName, instanceId, ...body } = options;
  await _makePost(domainName, '/folder', instanceId, body);
}
