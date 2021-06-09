import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { IncidentDao } from 'util/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }
  const session = await getSession();
  console.log(session);

  const body = JSON.parse(req.body);

  const result = await IncidentDao.create(body);
  console.log(result);
  res.status(200).json({ name: 'John Doe' });
};
