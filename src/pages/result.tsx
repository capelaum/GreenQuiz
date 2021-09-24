import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { ResultStatistic } from "../components/ResultStatistic";
import { useQuestion } from "../contexts/questionContext";

import styles from "../styles/Result.module.scss";

export default function Result() {
  const router = useRouter();
  const { resetQuiz } = useQuestion();

  const checkNaNValue = (value: number) => {
    return Number.isNaN(value) ? 0 : value;
  };

  const total = checkNaNValue(+router.query.total);
  const score = checkNaNValue(+router.query.score);
  const percent = checkNaNValue(Math.round((score / total) * 100));

  return (
    <>
      <Head>
        <title>Green Quiz | Resultado</title>
        <meta name="description" content="Green Quiz" />
      </Head>
      <div className={styles.result}>
        <h1>🎉 Resultado 🎉</h1>
        <div className={styles.resultStatisticsContainer}>
          <ResultStatistic text={"Perguntas"} value={total} />
          <ResultStatistic text={"Score"} value={score} bgColor="#5603AD" />
          <ResultStatistic text={"Percentual"} value={`${percent}%`} />
        </div>
        <Button onClick={resetQuiz} text="Menu" />
      </div>
    </>
  );
}
