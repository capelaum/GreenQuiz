import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import { firebaseApp } from "../services/firebase";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onIdTokenChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import nookies from "nookies";
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
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    return onIdTokenChanged(auth, async user => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return Router.push("/login");
      }

      console.log("~Logged User: ", user);

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
    });
  }, [auth]);

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
        const { code, message, email } = error;
        console.log(message);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signOutWithGoogle = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        nookies.destroy(undefined, "token");
        Router.push("/login");
      })
      .catch(error => {
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
