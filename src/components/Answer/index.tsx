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
        {!answer.isRevealed ? (
          <div className={styles.front}>
            <div
              className={styles.letter}
              style={{ backgroundColor: letterColor }}
            >
              {letter}
            </div>
            <div className={styles.answerText}>{answer.text}</div>
          </div>
        ) : (
          <div className={styles.back}>
            {answer.isCorrect ? (
              <div className={styles.right}>
                <div>A resposta certa é...</div>
                <div className={styles.text}>{answer.text}</div>
              </div>
            ) : (
              <div className={styles.wrong}>
                <div>A resposta informada está errada...</div>
                <div className={styles.text}>{answer.text}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
