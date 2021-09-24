import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Button } from "../Button";
import { Question } from "../Question";

import { useQuestion } from "../../contexts/questionContext";

import styles from "./styles.module.scss";
import { LoadingScreen } from "../LoadingScreen";

export function Quiz() {
  const { question, getNextQuestionId, handleNextQuestion } = useQuestion();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    setPageLoading(true);
  }, [router, question?.id]);

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
