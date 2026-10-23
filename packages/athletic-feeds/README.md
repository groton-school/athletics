# @groton/athletic-feeds

ICS and RSS feeds for athletic events from Veracross

## Install

Requires a Google Cloud Project with billing and the Secret Manager API enabled.

Create two secrets: `VERACROSS_CREDENTIALS` and `VERACROSS_REFRESH_TOKEN`.

Give the default compute service account IAM roles `Secret Manager Secret Accessor` for the project and `Secret Manager Secret Version Manager` for the `VERACROSS_REFRESH_TOKEN` secret.

Create a new OAuth App in your Veracross instance with the scopes:

- `events.athletics:list`
- `events.athletics_opponents:list`

Populate `VERACROSS_CREDENTIALS` with the JSON value:

```json
{
  "school_route": "example",
  "client_id": "<OAuth Client ID from Veracross instance>",
  "client_secret": "<Oauth Client Secret from Veracross instance",
  "redirect_uri": "<GCP Cloud Run public URL>/oauth2/veracross/redirect"
}
```

Deploy code to Google Cloud Run:

```bash
git clone https://github.com/groton-school/athletics.git path/to/project
cd path/to/project
pnpm install
pnpm run athletic-feeds
```

## Usage

`<GCP Cloud Run public URL>/feed/rss` provides an ATOM RSS feed suitable for digital signage.

`<GCP Cloud Run public URL>/feed/ics` provides an ICS webcal feed of athletic competitions with reported scores, summaries, locations.
