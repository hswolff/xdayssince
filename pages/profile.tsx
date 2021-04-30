import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function CreatePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profile | XDaysSince</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Profile</h1>
      </main>
    </div>
  );
}
