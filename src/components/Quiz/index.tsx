import QuestionModel from "../../models/question";
import { Button } from "../Button";
import { Question } from "../Question";

import styles from "./styles.module.scss";

interface QuizProps {
  question: QuestionModel;
  lastQuestion: boolean;
  handleAnsweredQuestion: (question: QuestionModel) => void;
  handleNextQuestion: () => void;
}

export function Quiz({
  question,
  lastQuestion,
  handleAnsweredQuestion,
  handleNextQuestion,
}: QuizProps) {
  function onResponse(index: number) {
    if (question.isNotAnswered) {
      handleAnsweredQuestion(question.selectAnswer(index));
    }
  }

  return (
    <div className={styles.quiz}>
      {question ? (
        <Question
          question={question}
          duration={5}
          onResponse={onResponse}
          finishedTime={handleNextQuestion}
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
