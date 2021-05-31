import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { connectToDatabase, safeStringify } from 'util/db';
import { User } from 'next-auth';

export default function ProfilePage({ user }: { user: User }) {
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
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ name: 'Harry Wolff' });
  return { props: { user: safeStringify(user) } };
}
