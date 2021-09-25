import { firebaseApp } from "./firebase";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  Firestore,
  where,
  query,
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

const getUsers = async (db: Firestore) => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map(doc => doc.data());

  return usersList;
};

const getUserByEmail = async (email: string) => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs;

  return user;
};

export { db, addUser, getUsers, getUserByEmail };
