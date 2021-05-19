import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

export default function ProfilePage() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && !session) {
    router.push('/');
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile | XDaysSince</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Profile</h1>
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      </main>
    </div>
  );
}
