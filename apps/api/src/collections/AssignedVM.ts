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
  ip?: string | null;
  domainPrefix?: string | null;
  baseDomain?: string | null;
  domain?: string | null;
  zoneChangeId?: string | null;
  lastPingTime?: Date;
}

export const AssignedVMCollection = createCollection<AssignedVMModel>(
  'assignedVm'
);
