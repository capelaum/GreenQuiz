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
          <table className={styles.rankingTable} cellSpacing="0">
            <thead>
              <th>Nome</th>
              <th>E-mail</th>
              <th className={styles.score}>Score</th>
              <th className={styles.position}>Posição</th>
            </thead>
            <tbody className={styles.tablebody}>
              {users &&
                users.map(user => {
                  if (user.answeredQuiz) {
                    return (
                      <tr key={user.uid}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className={styles.score}>
                          {user.score}/{total}
                        </td>
                        <td className={styles.position}>1º</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>

        <Button text="Menu" href="/" />
      </div>
    </>
  );
}
