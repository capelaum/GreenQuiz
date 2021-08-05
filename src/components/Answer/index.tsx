import AnswerModel from "../../models/answer";

import styles from "./styles.module.scss";

interface AnswerProps {
  answer: AnswerModel;
  index: number;
  letter: string;
  letterColor: string;
}

export function Answer({ answer, letter }: AnswerProps) {
  return (
    <div className={styles.answer}>
      <div className={styles.answerContent}>
        <div className={styles.front}>
          <div className={styles.letter}>{letter}</div>
          <div className={styles.answerText}>{answer.text}</div>
        </div>
        <div className={styles.back}></div>
      </div>
    </div>
  );
}
