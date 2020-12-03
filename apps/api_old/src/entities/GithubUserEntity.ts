import { createBaseEntity } from '../lib';

export interface GithubUserKey {
  githubId: number;
}

export interface GithubUserProps extends GithubUserKey {
  userId: string;
}

const BaseEntity = createBaseEntity('github_user')
  .props<GithubUserProps>()
  .key<GithubUserKey>(key => `$:${key.githubId}`)
  .build();

export class GithubUserEntity extends BaseEntity {}
