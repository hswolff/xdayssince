import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, IncidentDao } from 'util/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
    return;
  }

  const sessionToken = req.cookies['next-auth.session-token'];

  const { db } = await connectToDatabase();
  const session = await db.collection('sessions').findOne({ sessionToken });

  if (!session || !session.userId) {
    return res.status(403);
  }

  const body = JSON.parse(req.body);

  const result = await IncidentDao.create({
    ...body,
    creatorId: session.userId,
  });

  res.status(200).json(result);
};
