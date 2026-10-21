import { signIn } from '@/lib/auth';
import { Button, Image } from 'react-bootstrap';
import { Centered } from '../Centered';

export async function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <Centered>
        <Button type="submit">Sign in</Button>
        <Image
          className="mt-5"
          src="/assets/Groton_zebra_type_2c.png"
          style={{ height: '20vh' }}
        />
      </Centered>
    </form>
  );
}
