import { firebaseApp } from "./firebase";
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

type User = {
  uid: string;
  name: string;
  email: string;
  authProvider: string;
  answeredQuiz: boolean;
};

const addUser = async (user: User) => {
  try {
    const usersCollection = collection(db, "users");
    const docRef = await addDoc(usersCollection, user);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map(doc => doc.data());

  return usersList;
};

const getUserByEmail = async (email: string) => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const userList = querySnapshot.docs;

  if (userList.length === 0) return;

  if (userList.length === 1) {
    const user = userList[0];
    return user;
  }

  if (userList.length > 1) {
    throw new Error("Não pode ter 2 emails iguais no Firestore!!");
  }
};

const setUserResult = async (user: User, score: number) => {
  console.log("User & Score:", user, score);

  const { uid, displayName: name, email } = user;
  console.log("uid, name, email, authProvider", uid, name, email);
  const userToUpdate = await getUserByEmail(user.email);

  const docRef = userToUpdate.id;
  console.log("🚀 ~ docRef", docRef);

  await setDoc(doc(db, "users", docRef), {
    uid,
    name,
    email,
    authProvider: "google",
    score,
    answeredQuiz: true,
  });
};

export { db, addUser, getUsers, getUserByEmail, setUserResult };
