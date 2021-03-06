import { Db, MongoClient, ObjectId } from 'mongodb';

export interface CachedMongo {
  client: MongoClient;
  db: Db;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: CachedMongo | null;
        promise: Promise<CachedMongo> | null;
      };
    }

    interface ProcessEnv {
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      NEXTAUTH_URL: string;
      MONGODB_URI: string;
      MONGODB_DB: string;
    }
  }
}

module 'next-auth' {
  interface User {
    _id: ObjectId;
  }

  interface Session {
    userId: ObjectId;
  }
}
