import type { NextApiRequest, NextApiResponse } from 'next';
import { Incident, IncidentDao, UserDao } from 'lib/db';
import { ObjectId } from 'mongodb';

export default async function IncidentAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let userId;

  try {
    userId = await UserDao.getUserIdFromSession(req);
  } catch (error) {
    return res.status(401).end();
  }

  switch (req.method) {
    case 'POST': {
      const body: Incident = JSON.parse(req.body);

      const result = await IncidentDao.create({
        ...body,
        creatorId: new ObjectId(userId),
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
      if (userId !== incident.creatorId.toString()) {
        return res.status(403).end();
      }

      const result = await IncidentDao.delete(incidentId);

      return res.status(200).json(result);
    }
    default: {
      return res.status(405).end();
    }
  }
}
