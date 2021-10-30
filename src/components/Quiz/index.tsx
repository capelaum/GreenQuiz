import { useState, useEffect } from "react";

import { Button } from "../Button";
import { Question } from "../Question";
import { LoadingScreen } from "../LoadingScreen";

import { useQuestion } from "../../contexts/questionContext";

import styles from "./styles.module.scss";

export function Quiz() {
  const { question, currentQuestionIndex, handleNextQuestion, questions } =
    useQuestion();
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
            onClick={() => handleNextQuestion()}
            disabled={!question.isAnswered}
            text={
              currentQuestionIndex === questions.length
                ? "Finalizar"
                : "Próxima"
            }
          />
        </div>
      )}
    </>
  );
}
