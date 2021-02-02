import { getResponseBody } from './helper';
import { config } from 'config';
import fetch from 'node-fetch';

const API_URL = 'https://discord.com/api/v8';

interface DiscordInvite {
  code: string;
}

function getHeaders() {
  const ret: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bot ${config.discord.token}`,
  };
  return ret;
}

export async function createDiscordInvite(): Promise<DiscordInvite> {
  const res = await fetch(
    `${API_URL}/channels/${config.discord.inviteChannelId}/invites`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        max_age: 0,
        max_uses: 1,
        unique: true,
      }),
    }
  );
  return getResponseBody('Exchange code', res);
}
