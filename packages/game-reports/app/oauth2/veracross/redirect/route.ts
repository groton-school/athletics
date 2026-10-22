import { Veracross } from '@/lib/Veracross';
import { credentials } from '@/lib/Veracross/Credentials';

export async function GET(request: Request) {
  await Veracross.OAuth.handleOAuth2Redirect(new URL(request.url));
  // TODO add a meaningful redirect
  const cred = await credentials();
  return Response.json({
    user: await Veracross.Authorization.OAuth.Userinfo.get({
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Base ${await Veracross.OAuth.getAccessToken()}`
      }
    }),
    token: await Veracross.Authorization.OAuth.Introspect.post({
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: {
        client_id: cred.client_id,
        client_secret: cred.client_secret,
        token: await Veracross.OAuth.getAccessToken()
      }
    })
  });
}
