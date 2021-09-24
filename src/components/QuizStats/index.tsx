import { useQuestion } from "../../contexts/questionContext";

import styles from "./styles.module.scss";

export function QuizStats() {
  const { question, questionsIds, score } = useQuestion();

  return (
    <>
      <div className={`${styles.stats} ${styles.score}`}>Score: {score}</div>
      <div className={styles.stats}>
        Pergunta:{" "}
        {`${questionsIds.indexOf(question?.id) + 1}/${questionsIds.length}`}
      </div>
    </>
  );
}
