import type { NextApiRequest, NextApiResponse } from 'next';
import { IncidentDao, UserDao } from 'lib/db';

export default async function IncidentAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let userId;

  try {
    userId = await UserDao.getUserIdFromSession(req);

    console.log('User Id: ', userId)
  } catch (error) {
    return res.status(401).end();
  }

  switch (req.method) {
    case 'POST': {
      const body = JSON.parse(req.body);

      const result = await IncidentDao.create({
        ...body,
        creatorId: userId,
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
      if (userId !== incident.creatorId.toHexString()) {
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
