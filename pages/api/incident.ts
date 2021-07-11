import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, IncidentDao } from 'util/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionToken = req.cookies['next-auth.session-token'];

  if (!sessionToken) {
    return res.status(401).end();
  }

  const { db } = await connectToDatabase();
  const session = await db.collection('sessions').findOne({ sessionToken });
  if (!session || !session.userId) {
    return res.status(403).end();
  }

  const { userId: sessionUserId } = session;

  switch (req.method) {
    case 'POST': {
      const body = JSON.parse(req.body);

      const result = await IncidentDao.create({
        ...body,
        creatorId: session.userId,
      });

      return res.status(200).json(result);
    }
    case 'DELETE': {
      const incidentId = req.body;
      const incident = await IncidentDao.getById(incidentId);
      if (!incident) {
        return res.status(403).end();
      }

      // Only let the creator delete their own incident
      if (sessionUserId.toString() !== incident.creatorId.toHexString()) {
        return res.status(403).end();
      }

      const result = await IncidentDao.delete(incidentId);

      return res.status(200).json(result);
    }
    default: {
      return res.status(405).end();
    }
  }
};
