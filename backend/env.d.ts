import jwt = require('jsonwebtoken');

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: '4000';
      DB_PASSWORD: string;
      DB_USERNAME: string;
      DB_HOST: string;
      DB_DATABASE: string;

      SECRET_JWT_SEED: jwt.Secret;
      JWT_EXPIRE_IN: string;

      FIREBASE_API_KEY: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE: string;
      FIREBASE_API_ID: string;

      GOOGLE_CLIENT_ID: string
    }
  }
}

/*
!IMPORTANT
CUANDO NO SE TIENEN IMPORTACIONES EXTERNAS, SE USA LO SIGUIENTE:
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: '4000';
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB_HOST: string;
    DB_DATABASE: string;

    SECRET_JWT_SEED: jwt.Secret;
    JWT_EXPIRE_IN: string;

    FIREBASE_API_KEY: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE: string;
    FIREBASE_API_ID: string;
  }
}
*/
