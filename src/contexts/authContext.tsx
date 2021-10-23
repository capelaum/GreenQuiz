import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Router from "next/router";
import nookies from "nookies";
import { toast } from "react-toastify";

import { firebaseApp } from "../services/firebase";
import { addUser, getUserByEmail, User } from "../services/firestore";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onIdTokenChanged,
  NextOrObserver,
} from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  userAuth: NextOrObserver<User>;
  sigInWithGoogle: () => Promise<void>;
  signOutWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    // O parametro user do onIdTokenChanged é diferente!
    return onIdTokenChanged(auth, async userAuth => {
      if (!userAuth) {
        setUserAuth(null);
        nookies.set(undefined, "token", "", {});
        return Router.push("/login");
      }

      // console.log("~ userAuth:", userAuth);
      const token = await userAuth.getIdToken();
      nookies.set(undefined, "token", token, {});
      setUserAuth(userAuth);
    });
  }, [auth]);

  useEffect(() => {
    (async () => {
      try {
        if (userAuth) {
          const findUser = await getUserByEmail(userAuth.email);
          if (findUser) setUser(findUser.data());
        }
      } catch (error) {
        console.error("Um erro aconteceu ao buscar informações do usuário!");
      }
    })();
  }, [userAuth]);

  const sigInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        nookies.set(undefined, "token", token, {});

        const { uid, displayName: name, email } = result.user;
        const userFound = await getUserByEmail(email);

        if (!userFound) {
          const newUser = {
            uid,
            name,
            email,
            score: 0,
            authProvider: "google",
            answeredQuiz: false,
          };

          addUser(newUser);
          setUser(newUser);
        }

        if (userFound) {
          setUser(userFound.data());
        }

        toast.success(`Bem vindo ${user.name}!`, {
          theme: "light",
          icon: "😄",
        });
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
        setUserAuth(null);
        nookies.destroy(undefined, "token");
        toast.info("Até mais", {
          theme: "light",
          icon: "👋",
        });
        Router.push("/login");
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, userAuth, sigInWithGoogle, signOutWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
