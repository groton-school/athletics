import gcloud from '@battis/partly-gcloudy';
import { Env } from '@qui-cli/env';

export async function run() {
  // TOOO enable auto-billing
  // TODO enable secret manager and publish credentials
  // TODO create service account with secret manager accessor and secret manager version manager permissions
  // TODO write service account email to SERVICE_ACCOUNT
  // TODO generate access-verifier pairs
  // TODO write PUBLIC_URL to env
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
