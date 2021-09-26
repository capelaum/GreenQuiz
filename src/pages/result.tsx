import Head from "next/head";
import { useEffect } from "react";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";
import { ResultStatistic } from "../components/ResultStatistic";

import { useAuth } from "../contexts/authContext";
import { useQuestion } from "../contexts/questionContext";

import { setUserResult } from "../services/firestore";

import styles from "../styles/Result.module.scss";

export default function Result() {
  const { resetQuiz, score, questionsIds } = useQuestion();
  const { user, userAuth } = useAuth();

  const total = questionsIds.length;
  const percent = Math.round((score / total) * 100);

  useEffect(() => {
    (async () => {
      if (user) {
        await setUserResult(user, score);
      }
    })();
  });

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz | Resultado</title>
        <meta name="description" content="Green Quiz" />
      </Head>
      <div className={styles.result}>
        <h1>🎉 Resultado 🎉</h1>
        <h2>{user ? user.name : "Usuário"}</h2>
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
