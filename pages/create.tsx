import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import styles from '../styles/Home.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function getTodaysDate() {
  const date = new Date();

  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? `0${month}` : month;

  let day = date.getDate().toString();
  day = day.length === 1 ? `0${day}` : day;

  return `${date.getFullYear()}-${month}-${day}`;
}

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
        <Formik
          initialValues={{ title: '', lastOccurred: getTodaysDate() }}
          initialStatus={{ success: undefined, error: undefined }}
          validate={(values) => {
            const errors: { [key: string]: string } = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if (!values.lastOccurred) {
              errors.lastOccurred = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
            setStatus({
              success: undefined,
              error: undefined,
            });

            try {
              const req = await fetch('/api/incident', {
                method: 'POST',
                body: JSON.stringify(values),
              });
              const response = await req.json();
              console.log(response);
              if (response.success) {
                resetForm({
                  status: {
                    success: true,
                  },
                });
              }
            } catch (error) {
              console.error(error);
              setStatus({
                error,
              });
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status.success && <div>Success!</div>}
              {status.error && <div>Error: {status.error}</div>}
              <div>
                <Field
                  type="input"
                  name="title"
                  placeholder="Title of the incident"
                />
                <ErrorMessage name="title" component="div" />
              </div>
              <div>
                <Field type="date" name="lastOccurred" />
                <ErrorMessage name="lastOccurred" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
