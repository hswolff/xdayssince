import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import styles from 'styles/Home.module.css';
import { Incident, IncidentDao, safeStringify } from 'lib/db';

export default function IncidentPage({ title }: Incident) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Incident {title} | XDaysSince</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Incident: {title}</h1>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const items = await IncidentDao.getAll();
  return {
    paths: items.map((item) => ({
      params: {
        slug: item._id.toString(),
      },
    })),

    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const item = await IncidentDao.getById(params?.slug as string);
  return {
    props: safeStringify(item),
    revalidate: 30,
  };
};
