import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';

export default function CreatePage() {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create | XDaysSince</title>
      </Head>

      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      <main className={styles.main}>
        <h1 className={styles.title}>Create a new XDaysSince</h1>
      </main>
    </div>
  );
}
