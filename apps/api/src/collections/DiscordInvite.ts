import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface DiscordInviteModel {
  _id: string;
  userId: ObjectID;
  createdAt: Date;
}

export const DiscordInviteCollection = createCollection<DiscordInviteModel>(
  'discordInvite',
  [
    {
      key: {
        userId: 1,
      },
    },
  ]
);
