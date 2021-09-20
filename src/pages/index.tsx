import Head from "next/head";

import { Quiz } from "../components/Quiz";
import { useQuestion } from "../hooks/useQuestion";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const { question, questionsIds, score } = useQuestion();

  return (
    <div className={styles.container}>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Next Quiz" />
      </Head>

      <div className={`${styles.stats} ${styles.score}`}>Score: {score}</div>
      <div className={styles.stats}>
        Pergunta:{" "}
        {`${questionsIds.indexOf(question?.id) + 1}/${questionsIds.length}`}
      </div>

      <Quiz />
    </div>
  );
}
