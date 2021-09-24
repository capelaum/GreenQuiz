import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import firebaseClient from "./firebase";

import { redirect } from "next/dist/next-server/server/api-utils";

firebaseClient();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const sigInWithGoogle = async () => {
  const user = await signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      return result.user;
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      // The email of the user's account used.
      const email = error.email;

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });

  return user;
};

export const signOutWithGoogle = async () => {
  return await signOut(auth)
    .then(() => {
      // Sign-out successful.
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    })
    .catch(error => {
      // An error happened.
    });
};
