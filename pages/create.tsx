import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';

export default function CreatePage() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!loading && !session) {
    router.push('/');
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create | XDaysSince</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Create a new XDaysSince</h1>
      </main>
    </div>
  );
}
