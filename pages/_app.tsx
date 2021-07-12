import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <div>
        <Nav />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

function Nav() {
  const [session] = useSession();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {session && (
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn('github')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
}
