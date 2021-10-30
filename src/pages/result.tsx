import Head from "next/head";
import { useEffect, useState } from "react";

import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { LoadingScreen } from "../components/LoadingScreen";
import { MainImages } from "../components/MainImages";
import { ResultStatistic } from "../components/ResultStatistic";

import { useAuth } from "../contexts/authContext";
import { useQuestion } from "../contexts/questionContext";
import { getQuestionsTotal } from "../services/questions";

import styles from "../styles/Result.module.scss";

export default function Result() {
  const { questions } = useQuestion();
  const { user, userAuth } = useAuth();
  const [questionsTotal, setQuestionsTotal] = useState(0);
  const [userPercent, setUserPercent] = useState(0);

  useEffect(() => {
    (async () => {
      const total = await getQuestionsTotal();
      setQuestionsTotal(total);
      const percent = Math.round((user?.score / total) * 100);
      const userPercent = isNaN(percent) ? 0 : percent;
      setUserPercent(userPercent);
    })();
  }, [user?.score]);

  if (!userAuth || !questions) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz | Resultado</title>
        <meta name="description" content="Green Quiz" />
      </Head>
      <Container>
        <MainImages trophy result />
        <h2 className={styles.resultMessage}>
          {user ? user.name : "Usuário"}, seu resultado nesse quiz foi..
        </h2>
        <div className={styles.resultStatisticsContainer}>
          <ResultStatistic text={"Perguntas"} value={questionsTotal} />
          <ResultStatistic
            text={"Score"}
            value={user?.score}
            bgColor={"var(--dark-purple)"}
          />
          <ResultStatistic text={"Percentual"} value={`${userPercent}%`} />
        </div>
        <Button href="/" text="Menu" />
      </Container>
    </>
  );
}
