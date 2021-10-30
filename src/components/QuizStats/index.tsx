import { useQuestion } from "../../contexts/questionContext";
import { useAuth } from "../../contexts/authContext";

import styles from "./styles.module.scss";

export function QuizStats() {
  const { question, questions } = useQuestion();
  const { user } = useAuth();

  return (
    <>
      <div className={styles.stats}>
        <p>
          Pergunta: {`${questions.indexOf(question) + 1}/${questions.length}`}
        </p>
        <p>Score: {user.score}</p>
      </div>
    </>
  );
}
