import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
            <li>
              <Link href="/i/bananas">
                <a>Banana Incident</a>
              </Link>
            </li>
          </ul>
        </nav>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
