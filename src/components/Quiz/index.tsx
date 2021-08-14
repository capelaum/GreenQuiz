import { useQuestion } from "../../hooks/useQuestion";
import { Button } from "../Button";
import { Question } from "../Question";

import styles from "./styles.module.scss";

export function Quiz() {
  const { question, getNextQuestionId, handleNextQuestion } = useQuestion();

  return (
    <div className={styles.quiz}>
      {question ? <Question /> : false}

      <Button
        onClick={handleNextQuestion}
        text={getNextQuestionId() === undefined ? "Finalizar" : "Próxima"}
      />
    </div>
  );
}
