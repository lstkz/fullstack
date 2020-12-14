import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface AssignedVMModel {
  _id: string;
  tagId: string;
  isReady: boolean;
  awsId?: string;
  userId: ObjectID;
  launchTime?: Date;
  ip?: string;
  domainPrefix?: string;
  baseDomain?: string;
  domain?: string;
  zoneChangeId?: string;
}

export const AssignedVMCollection = createCollection<AssignedVMModel>(
  'assignedVm'
);
