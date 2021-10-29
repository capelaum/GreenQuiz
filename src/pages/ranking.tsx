import { useEffect, useState } from "react";
import Head from "next/head";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";
import { MainImages } from "../components/MainImages";
import { Container } from "../components/Container";

import { useQuestion } from "../contexts/questionContext";
import { useAuth } from "../contexts/authContext";
import { getUsers, User } from "../services/firestore";

import styles from "../styles/Ranking.module.scss";

export default function Ranking() {
  const { userAuth } = useAuth();
  const { questions } = useQuestion();
  const [users, setUsers] = useState<User[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const total = questions.length;

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      const usersThatAnsweredQuiz = users.filter(user => user.answeredQuiz);
      const sortedUsers = sortUsersByScore(usersThatAnsweredQuiz);
      setUsers(sortedUsers);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    setPageLoading(true);
  }, []);

  if (!userAuth) {
    return <LoadingScreen />;
  }

  function sortUsersByScore(users: User[]) {
    users.map((user: User) => {
      !user.score ? (user.score = 0) : user.score;
      !user.duration ? (user.duration = 0) : user.duration;
    });

    return users.sort((a, b) => {
      const result = b.score.valueOf() - a.score.valueOf();

      if (result === 0) {
        return a.duration - b.duration;
      }

      return result;
    });
  }

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}m ${+seconds < 10 ? "0" : ""}${seconds}s`;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Ranking" />
      </Head>
      <Container>
        <MainImages recycle recyclePeople />
        <h2>Ranking</h2>

        {pageLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className={styles.rankingContainer}>
              <table className={styles.rankingTable} cellSpacing="0">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th className={styles.center}>Score</th>
                    <th className={styles.center}>Posição</th>
                    <th className={styles.center}>Duração</th>
                  </tr>
                </thead>
                <tbody className={styles.tablebody}>
                  {users &&
                    users.map((user, index) => {
                      if (user.answeredQuiz) {
                        return (
                          <tr key={user.uid}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className={styles.center}>
                              {user.score}/{total}
                            </td>
                            <td className={styles.center}>{index + 1}º</td>
                            <td className={styles.center}>
                              {millisToMinutesAndSeconds(user.duration)}
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            <Button text="Menu" href="/" />
          </>
        )}
      </Container>
    </>
  );
}
