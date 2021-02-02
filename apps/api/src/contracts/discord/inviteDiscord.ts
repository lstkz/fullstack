import { config } from 'config';
import { ObjectID } from 'mongodb';
import { S } from 'schema';
import { DiscordInviteCollection } from '../../collections/DiscordInvite';
import { UserCollection } from '../../collections/User';
import { createDiscordInvite } from '../../common/discord';
import { dispatchTask } from '../../dispatch';
import { createContract, createTaskBinding } from '../../lib';

export const inviteDiscord = createContract('discord.inviteDiscord')
  .params('userId')
  .schema({
    userId: S.string().objectId(),
  })
  .fn(async userId => {
    if (!config.discord.enabled) {
      return;
    }
    const user = await UserCollection.findByIdOrThrow(userId);
    const invites = await DiscordInviteCollection.findAll({
      userId,
    });
    if (invites.length) {
      return;
    }
    const { code } = await createDiscordInvite();
    await DiscordInviteCollection.insertOne({
      _id: code,
      createdAt: new Date(),
      userId,
    });
    await dispatchTask({
      type: 'SendEmail',
      payload: {
        template: {
          name: 'ButtonAction',
          params: {
            buttonText: 'Dołącz',
            buttonUrl: `https://discord.gg/${code}`,
            description: `Discord służy do dyskusji na temat programowania, zadań i zgłaszania problemów.`,
            header: 'Dołącz do Discorda',
          },
        },
        subject: 'Zaproszenie do społeczności Discord',
        to: user.email,
      },
    });
  });

export const inviteDiscordTask = createTaskBinding({
  type: 'InviteDiscord',
  handler: async (_, event) => {
    await inviteDiscord(new ObjectID(event.userId));
  },
});
