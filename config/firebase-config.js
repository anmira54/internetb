import env from './env-config';

export const firebaseConfig = {
  apiKey: { env,APIKEY },
  authDomain: { env,AUTHDOMAIN },
  projectId: { env,PROJECTID },
  storageBucket: { env,STORAGEBUCKET },
  messagingSenderId: { env,MESSAGINGSENDERID },
  appId: { env,APPID }
};