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

import { addUser, getUserByEmail } from "../services/firestore";

import nookies from "nookies";
import Router from "next/router";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  uid: string;
  name: string;
  email: string;
  authProvider: string;
  answeredQuiz: boolean;
};

interface AuthContextData {
  user: User;
  sigInWithGoogle: () => Promise<void>;
  signOutWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    //! O user do parametro do onIdTokenChanged é diferente!
    return onIdTokenChanged(auth, async user => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return Router.push("/login");
      }

      console.log("~ Logged User: ", user);
      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
    });
  }, [auth]);

  const sigInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        nookies.set(undefined, "token", "", token);

        const { uid, displayName: name, email } = result.user;
        const findUser = await getUserByEmail(email);
        console.log("~ findUser:", findUser);

        if (!findUser) {
          const newUser = {
            uid,
            name,
            email,
            authProvider: "google",
            answeredQuiz: false,
          };

          addUser(newUser);
          setUser(newUser);
        }

        if (findUser) {
          setUser(findUser.data());
        }
      })
      .catch(error => {
        const { code, message, email } = error;
        console.error(message);

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
