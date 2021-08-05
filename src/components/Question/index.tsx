import QuestionModel from "../../models/question";
import { QuestionText } from "../QuestionText";

import styles from "./styles.module.scss";

interface QuestionProps {
  question: QuestionModel;
}

export function Question({ question }: QuestionProps) {
  return (
    <div className={styles.question}>
      <QuestionText text={question.text} />
    </div>
  );
}
