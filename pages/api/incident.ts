import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, IncidentDao } from 'util/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.status(405);
    return;
  }

  const incidentId = req.body;
  const incident = await IncidentDao.getById(incidentId);
  console.log('1');
  if (!incident) {
    return res.status(403).end();
  }

  console.log('2');
  const sessionToken = req.cookies['next-auth.session-token'];
  const { db } = await connectToDatabase();
  const session = await db.collection('sessions').findOne({ sessionToken });
  if (!session || !session.userId) {
    return res.status(403).end();
  }
  console.log('3');

  const { userId: sessionUserId } = session;
  console.log('4', sessionUserId, incident.creatorId);

  // Only let the creator delete their own incident
  if (sessionUserId.toString() !== incident.creatorId.toHexString()) {
    console.log('6');
    return res.status(403).end();
  }
  console.log('5');

  const result = await IncidentDao.delete(incidentId);

  res.status(200).json(result);
};
