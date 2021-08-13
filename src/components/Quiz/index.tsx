import QuestionModel from "../../models/question";
import { Button } from "../Button";
import { Question } from "../Question";

import styles from "./styles.module.scss";

interface QuizProps {
  question: QuestionModel;
  lastQuestion: boolean;
  handleAnsweredQuestion: (question: QuestionModel) => void;
  handleNextQuestion: () => void;
  finishedTime: () => void;
}

export function Quiz({
  question,
  lastQuestion,
  handleAnsweredQuestion,
  handleNextQuestion,
  finishedTime,
}: QuizProps) {
  function onResponse(index: number) {
    if (question.isNotAnswered) {
      handleAnsweredQuestion(question.selectOption(index));
    }
  }

  return (
    <div className={styles.quiz}>
      {question ? (
        <Question
          question={question}
          duration={15}
          onResponse={onResponse}
          finishedTime={finishedTime}
        />
      ) : (
        false
      )}

      <Button
        onClick={handleNextQuestion}
        text={lastQuestion ? "Finalizar" : "Próxima"}
      />
    </div>
  );
}
