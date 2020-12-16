import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export type VMStatus =
  | 'creating'
  | 'running'
  | 'stopped'
  | 'stopping'
  | 'resuming';

export interface AssignedVMModel {
  _id: string;
  tagId: string;
  status: VMStatus;
  awsId?: string;
  userId: ObjectID;
  launchTime?: Date;
  ip?: string;
  domainPrefix?: string;
  baseDomain?: string;
  domain?: string;
  zoneChangeId?: string;
  lastPingTime?: Date;
}

export const AssignedVMCollection = createCollection<AssignedVMModel>(
  'assignedVm'
);
