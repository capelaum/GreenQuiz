import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { QuizStats } from "../components/QuizStats";

import styles from "../styles/Result.module.scss";

export default function Result() {
  const router = useRouter();

  const total = +router.query.total;
  const score = +router.query.score;
  const percent = Math.round((score / total) * 100);

  return (
    <>
      <Head>
        <title>Next Quiz | Resultado</title>
        <meta name="description" content="Next Quiz" />
      </Head>
      <div className={styles.result}>
        <h1>🎉 Resultado 🎉</h1>
        <div className={styles.quizStatsContainer}>
          <QuizStats text={"Perguntas"} value={total} />
          <QuizStats text={"Score"} value={score} bgColor="#9CD2A4" />
          <QuizStats
            text={"Percentual"}
            value={`${percent}%`}
            bgColor="#DE6A33"
          />
        </div>
        <Button href="/" text="Tentar novamente" />
      </div>
    </>
  );
}
