import QuestionModel from "../../models/question";
import { Button } from "../Button";
import { Question } from "../Question";

import styles from "./styles.module.scss";

interface QuizProps {
  question: QuestionModel;
  lastQuestion: boolean;
  handleSelectedOption: (question: QuestionModel) => void;
  handleNextQuestion: () => void;
  finishedTime: () => void;
}

export function Quiz({
  question,
  lastQuestion,
  handleSelectedOption,
  handleNextQuestion,
  finishedTime,
}: QuizProps) {
  function selectOption(index: number) {
    if (question.isNotAnswered) {
      handleSelectedOption(question.selectOption(index));
    }
  }

  return (
    <div className={styles.quiz}>
      {question ? (
        <Question
          question={question}
          duration={5}
          selectOption={selectOption}
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
