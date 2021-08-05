import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, Incident, IncidentDao, UserDao } from 'lib/db';
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
  let userId;

  try {
    userId = await UserDao.getUserIdFromSession(req);
  } catch (error) {
    return res.status(401).end();
  }

  const { db } = await connectToDatabase();

  const user = await db
    .collection<User>('users')
    .findOne({ _id: new ObjectId(userId) });

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
