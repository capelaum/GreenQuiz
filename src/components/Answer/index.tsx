import AnswerModel from "../../models/answer";

import styles from "./styles.module.scss";

interface AnswerProps {
  answer: AnswerModel;
  index: number;
  letter: string;
  letterColor: string;
  onResponse: (index: number) => void;
}

export function Answer({
  answer,
  index,
  letter,
  letterColor,
  onResponse,
}: AnswerProps) {
  return (
    <div className={styles.answer} onClick={() => onResponse(index)}>
      <div className={styles.answerContent}>
        <div className={styles.front}>
          <div
            className={styles.letter}
            style={{ backgroundColor: letterColor }}
          >
            {letter}
          </div>
          <div className={styles.answerText}>{answer.text}</div>
        </div>

        <div className={styles.back}></div>
      </div>
    </div>
  );
}
