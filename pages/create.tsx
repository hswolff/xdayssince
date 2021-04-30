import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function CreatePage() {
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
