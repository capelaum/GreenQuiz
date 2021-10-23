import { useQuestion } from "../../contexts/questionContext";
import { useAuth } from "../../contexts/authContext";

import styles from "./styles.module.scss";

export function QuizStats() {
  const { question, questionsIds } = useQuestion();
  const { user } = useAuth();

  return (
    <>
      <div className={styles.stats}>
        <p>
          Pergunta:{" "}
          {`${questionsIds.indexOf(question?.id) + 1}/${questionsIds.length}`}
        </p>
        <p>Score: {user.score}</p>
      </div>
    </>
  );
}
