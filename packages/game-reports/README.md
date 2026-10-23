# @groton/athletic-feeds

Coach-accessible game summaries and score reporting

## Install

Requires a Google Cloud Project with billing, the Secret Manager API enabled, and OAuth consent configured.

Create a new web application OAuth client with authorized redirect URI `<GCP Cloud Run public URL>/api/auth/callback/google` and scopes `.../auth/userinfo.email` and `.../auth/userinfo.profile`

Create two secrets: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `VERACROSS_CREDENTIALS` and `VERACROSS_REFRESH_TOKEN`.

Put the OAuth client ID and secret in `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`.

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
pnpm run game-reports
```

## Usage

`<GCP Cloud Run public URL>/feed/rss` provides an ATOM RSS feed suitable for digital signage.

`<GCP Cloud Run public URL>/feed/ics` provides an ICS webcal feed of athletic competitions with reported scores, summaries, locations.
