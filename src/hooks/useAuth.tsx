import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  Auth,
} from "firebase/auth";

import nookies from "nookies";
import firebaseClient from "../services/firebase";
import Router from "next/router";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  displayName: string;
};

interface AuthContextData {
  user: User;
  sigInWithGoogle: () => Promise<void>;
  signOutWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  firebaseClient();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // return getAuth().onIdTokenChanged(async user => {
    if (!user) {
      setUser(null);
      nookies.destroy(undefined, "token");
      Router.push("/login");
    }

    console.log(user);

    // const token = await user.getIdToken();
    // setUser(user);
    // nookies.set(undefined, "token", token);
  }, [user]);

  const sigInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        nookies.set(undefined, "token", "", token);

        // The signed-in user info.
        setUser(result.user);
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
  };

  const signOutWithGoogle = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        nookies.destroy(undefined, "token");
        Router.push("/login");
      })
      .catch(error => {
        // An error happened.
        console.log(error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ user, sigInWithGoogle, signOutWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
