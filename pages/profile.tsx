import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import {
  connectToDatabase,
  Incident,
  IncidentDao,
  safeStringify,
} from 'util/db';
import { User } from 'next-auth';
import { IncidentItem } from 'components/IncidentItem';

interface ProfilePageProps {
  user: User;
  incidents: Incident[];
}

export default function ProfilePage({ user, incidents }: ProfilePageProps) {
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
        <ul>
          {incidents.map((item) => (
            <IncidentItem
              key={item._id.toString()}
              item={item}
              allowDelete
              onDelete={() => {
                // refresh all incidents
                console.log('refresh all incidents');
              }}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const user = await db
    .collection<User>('users')
    .findOne({ name: 'Harry Wolff' });

  // @ts-expect-error
  const incidents = await IncidentDao.getByUserId(user!._id.toString());

  return {
    props: {
      user: safeStringify(user),
      incidents: safeStringify(incidents),
    },
  };
}
