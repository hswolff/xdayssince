import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { IncidentItem } from 'components/IncidentItem';
import { useEffect, useState } from 'react';
import { UserView } from './api/user';

export default function ProfilePage() {
  const router = useRouter();
  const [session, loading] = useSession();

  const [{ user, incidents }, setState] = useState<UserView>({});

  async function fetchData() {
    const result = await (await fetch('/api/user')).json();
    setState(result);
  }

  useEffect(() => {
    fetchData();
  }, []);

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
        <pre>{user && JSON.stringify(user, null, 2)}</pre>
        <ul>
          {incidents?.map((item) => (
            <IncidentItem
              key={item._id.toString()}
              item={item}
              allowDelete
              onDelete={fetchData}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}
