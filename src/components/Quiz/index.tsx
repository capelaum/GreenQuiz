import { useState, useEffect } from "react";

import { Button } from "../Button";
import { Question } from "../Question";
import { LoadingScreen } from "../LoadingScreen";

import { useQuestion } from "../../contexts/questionContext";

import styles from "./styles.module.scss";

export function Quiz() {
  const { question, getNextQuestionId, handleNextQuestion } = useQuestion();
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    setPageLoading(true);
  }, [question?.id]);

  return (
    <>
      {pageLoading ? (
        <LoadingScreen />
      ) : (
        <div className={styles.quiz}>
          {question ? <Question /> : false}

          <Button
            onClick={handleNextQuestion}
            text={getNextQuestionId() === undefined ? "Finalizar" : "Próxima"}
          />
        </div>
      )}
    </>
  );
}
