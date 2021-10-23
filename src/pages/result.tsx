import Head from "next/head";
import { useEffect } from "react";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";
import { MainImages } from "../components/MainImages";
import { ResultStatistic } from "../components/ResultStatistic";

import { useAuth } from "../contexts/authContext";
import { useQuestion } from "../contexts/questionContext";

import { updateUser } from "../services/firestore";

import styles from "../styles/Result.module.scss";

export default function Result() {
  const { resetQuiz, score, questionsIds } = useQuestion();
  const { user, userAuth } = useAuth();

  const total = questionsIds.length;
  const percent = Math.round((score / total) * 100);

  useEffect(() => {
    (async () => {
      if (user) {
        user.endTime = Date.now();
        user.duration = user.endTime - user.startTime;
        user.score = score;
        await updateUser(user);
      }
    })();
  }, []);

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz | Resultado</title>
        <meta name="description" content="Green Quiz" />
      </Head>
      <div className="container">
        <MainImages trophy result />
        <h2 className={styles.resultMessage}>
          {user ? user.name : "Usuário"}, seu resultado nesse quiz foi..
        </h2>
        <div className={styles.resultStatisticsContainer}>
          <ResultStatistic text={"Perguntas"} value={total} />
          <ResultStatistic
            text={"Score"}
            value={score}
            bgColor={"var(--dark-purple)"}
          />
          <ResultStatistic text={"Percentual"} value={`${percent}%`} />
        </div>
        <Button onClick={resetQuiz} text="Menu" />
      </div>
    </>
  );
}
