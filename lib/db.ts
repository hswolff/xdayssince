import { Db, MongoClient, MongoClientOptions, ObjectId } from 'mongodb';
import { NextApiRequest } from 'next';
import { Session } from 'next-auth';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

interface CachedMongo {
  client: MongoClient;
  db: Db;
}

interface MongoGlobal {
  conn: CachedMongo | null;
  promise: Promise<CachedMongo> | null;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-expect-error
let cached = global.mongo as unknown as MongoGlobal;

if (!cached) {
  // @ts-expect-error
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{ db: Db }> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export interface Incident {
  _id: ObjectId;
  created: Date;
  lastOccurrence: Date;
  title: string;
  creatorId: ObjectId;
}

export const IncidentDao = {
  async getAll() {
    const { db } = await connectToDatabase();
    return await db.collection<Incident>('incidents').find().toArray();
  },

  async getById(id: string) {
    const { db } = await connectToDatabase();
    return await db
      .collection<Incident>('incidents')
      .findOne({ _id: new ObjectId(id) });
  },

  async getByUserId(id: string): Promise<Incident[]> {
    const { db } = await connectToDatabase();
    return await db
      .collection<Incident>('incidents')
      .find({ creatorId: new ObjectId(id) })
      .toArray();
  },

  async create(incident: Omit<Incident, '_id' | 'created'>) {
    const { db } = await connectToDatabase();
    const result = await db.collection<Incident>('incidents').insertOne({
      ...incident,
      created: new Date(),
    });

    return {
      success: result.result.ok === 1,
      response: result.ops[0],
    };
  },

  async delete(id: string) {
    const { db } = await connectToDatabase();
    const result = await db
      .collection<Incident>('incidents')
      .deleteOne({ _id: new ObjectId(id) });

    return {
      success: result.result.ok === 1,
    };
  },
};

export const SessionDao = {
  async getSessionFromReq(req: NextApiRequest) {
    const sessionToken = req.cookies['next-auth.session-token'];

    if (!sessionToken) {
      throw new Error('No session found in cookies');
    }

    const { db } = await connectToDatabase();
    const session = await db
      .collection<Session>('sessions')
      .findOne({ sessionToken });

    if (!session) {
      throw new Error('No session found');
    }

    return session;
  },
};

export function safeStringify(obj: unknown) {
  return JSON.parse(JSON.stringify(obj));
}
