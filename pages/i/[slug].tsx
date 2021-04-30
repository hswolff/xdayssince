import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from 'styles/Home.module.css';

export default function IncidentPage() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>Incident {slug} | XDaysSince</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Incident: {slug}</h1>
      </main>
    </div>
  );
}
