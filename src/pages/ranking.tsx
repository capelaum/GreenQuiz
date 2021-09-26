import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";

import { useQuestion } from "../contexts/questionContext";
import { useAuth } from "../contexts/authContext";
import { getUsers } from "../services/firestore";

import styles from "../styles/Ranking.module.scss";

type User = {
  uid: string;
  name: string;
  email: string;
  authProvider: string;
  answeredQuiz: boolean;
  score?: Number;
};

export default function Ranking() {
  const { questionsIds } = useQuestion();
  const total = questionsIds.length;
  const { userAuth } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, []);

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Ranking" />
      </Head>
      <div className="container">
        <Image src={Logo} alt="GreenQuiz Logo" />

        <h2>Ranking</h2>

        <div className={styles.rankingContainer}>
          <div className={styles.rankingHeader}>
            <h4>Nome</h4>
            <h4>E-mail</h4>
            <h4>Score</h4>
            <h4>Posição</h4>
          </div>
          <div className={styles.rankingTable}>
            {users &&
              users.map(user => {
                if (user.answeredQuiz) {
                  return (
                    <div key={user.uid} className={styles.rankingUser}>
                      <li>{user.name}</li>
                      <li>{user.email}</li>
                      <li>{user.score}</li>
                      <li>1º</li>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        <Button text="Menu" href="/" />
      </div>
    </>
  );
}
