import path from 'node:path';
import gcloud from '@battis/partly-gcloudy';
import { Env } from '@qui-cli/env';

Env.configure({
  path: path.join(path.dirname(import.meta.dirname), '.env.game-reports')
});

export async function run() {
  // TOOO enable auto-billing
  // TODO enable secret manager and publish credentials
  // Issue URL: https://github.com/groton-school/athletics/issues/14
  // TODO create service account with secret manager accessor and secret manager version manager permissions
  // TODO write service account email to SERVICE_ACCOUNT
  // TODO generate access-verifier pairs
  // TODO write PUBLIC_URL to env
  // Issue URL: https://github.com/groton-school/athletics/issues/13
  await gcloud.batch.run.deployService({
    defaultName: 'Game Reports',
    serviceName: (await Env.get({ key: 'SERVICE_NAME' })) || 'game-reports',
    serviceAccount: await Env.get({ key: 'SERVICE_ACCOUNT' }),
    env: true,
    args: {
      ...gcloud.batch.run.DEFAULT_ARGS,
      source: './out',
      'max-instances': 1,
      concurrency: 80,
      'allow-unauthenticated': true,
      'update-secrets': ['AUTH_GOOGLE_ID', 'AUTH_GOOGLE_SECRET']
        .map((secret) => `${secret}=${secret}:latest`)
        .join(','),
      'set-env-vars': [
        ['GOOGLE_CLOUD_PROJECT', gcloud.projects.active.getIdentifier()],
        ...(await Promise.all(
          [/*'PUBLIC_URL',*/ 'AUTH_URL', 'AUTH_SECRET', 'AUTH_TRUST_HOST'].map(
            async (key) => [key, await Env.get({ key })]
          )
        ))
      ]
        .map(([name, value]) => `${name}=${value}`)
        .join(',')
    },
    retainRevisions: 2
  });
}
