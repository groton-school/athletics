import gcloud from '@battis/partly-gcloudy';
import { Env } from '@qui-cli/env';

export async function run() {
  // TOOO enable auto-billing
  // TODO enable secret manager and publish credentials
  // Issue URL: https://github.com/groton-school/athletics/issues/12
  // TODO create service account with secret manager accessor and secret manager version manager permissions
  // Issue URL: https://github.com/groton-school/athletics/issues/11
  // TODO write service account email to SERVICE_ACCOUNT
  // Issue URL: https://github.com/groton-school/athletics/issues/10
  // TODO generate access-verifier pairs
  // Issue URL: https://github.com/groton-school/athletics/issues/9
  // TODO write PUBLIC_URL to env
  // Issue URL: https://github.com/groton-school/athletics/issues/8
  await gcloud.batch.run.deployService({
    defaultName: 'Athletic Feeds',
    serviceName: (await Env.get({ key: 'SERVICE_NAME' })) || 'athletic-feeds',
    serviceAccount: await Env.get({ key: 'SERVICE_ACCOUNT' }),
    env: true,
    args: {
      ...gcloud.batch.run.DEFAULT_ARGS,
      'max-instances': 1,
      concurrency: 80,
      'set-env-vars': [
        ['GOOGLE_CLOUD_PROJECT', gcloud.projects.active.getIdentifier()],
        ...(await Promise.all(
          ['PUBLIC_URL'].map(async (key) => [key, await Env.get({ key })])
        ))
      ]
        .map(([name, value]) => `${name}=${value}`)
        .join(','),
      'allow-unauthenticated': true
    },
    retainRevisions: 2
  });
}
