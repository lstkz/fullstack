import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface DomainCertModel {
  _id: ObjectID;
  createdAt: Date;
  expiresAt: Date;
  cert: string;
  certKey: string;
  domain: string;
}

export const DomainCertCollection = createCollection<DomainCertModel>(
  'domainCert',
  [
    {
      key: {
        domain: 1,
      },
    },
  ]
);
