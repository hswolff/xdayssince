import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, Incident, IncidentDao, SessionDao } from 'lib/db';
import { User } from 'next-auth';
import { ObjectId } from 'mongodb';

export interface UserView {
  user?: User;
  incidents?: Incident[];
}

export default async function UserAPI(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | UserView> {
  let session;

  try {
    session = await SessionDao.getSessionFromReq(req);
  } catch (error) {
    return res.status(401).end();
  }

  const { userId: sessionUserId } = session;

  const { db } = await connectToDatabase();

  const user = await db
    .collection<User>('users')
    .findOne({ _id: new ObjectId(sessionUserId) });

  if (!user) {
    return res.status(403).end();
  }

  const incidents = await IncidentDao.getByUserId(user._id.toString());

  const response: UserView = {
    user,
    incidents,
  };

  return res.json(response);
}
