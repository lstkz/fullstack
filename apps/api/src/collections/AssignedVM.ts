import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface AssignedVMModel {
  _id: string;
  awsId?: string;
  userId: ObjectID;
  launchTime?: Date;
  ip?: string;
  domainPrefix?: string;
  domain?: string;
  zoneChangeId?: string;
}

export const AssignedVMCollection = createCollection<AssignedVMModel>(
  'assignedVm'
);
