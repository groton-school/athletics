import { PathString } from '@battis/descriptive-types';
import gcloud from '@battis/partly-gcloudy';
import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Env } from '@qui-cli/env';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  source?: PathString;
};

Env.configure({ root: process.cwd() });
Positionals.require({
  source: {
    description: 'Path to source directory'
  }
});
Positionals.allowOnlyNamedArgs();

const config: Configuration = {};

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export function init() {
  configure({ source: Positionals.get('source') });
}

export async function run() {
  const { source } = config;
  if (!source) {
    throw new Error(`${Colors.positionalArg('source')} must be defined`);
  }

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
      source,
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
