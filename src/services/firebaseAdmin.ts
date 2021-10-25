import firebaseAdmin from "firebase-admin";
const serviceAccount = require("../../settings.json");

export const verifyIdToken = async (token: string) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
  }

  return firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error;
    });
};
