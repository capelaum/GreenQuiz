import OptionModel from "../../models/option";

import styles from "./styles.module.scss";

interface OptionProps {
  option: OptionModel;
  index: number;
  letter: string;
  letterColor: string;
  selectOption: (index: number) => void;
}

export function Option({
  option,
  index,
  letter,
  letterColor,
  selectOption,
}: OptionProps) {
  const revealedOption = option.isRevealed ? styles.revealedOption : "";

  return (
    <div className={styles.option} onClick={() => selectOption(index)}>
      <div className={`${styles.optionContent} ${revealedOption}`}>
        <div className={styles.front}>
          <div
            className={styles.letter}
            style={{ backgroundColor: letterColor }}
          >
            {letter}
          </div>
          <div className={styles.optionText}>{option.text}</div>
        </div>
        <div className={styles.back}>
          {option.isCorrect ? (
            <div className={styles.right}>
              <div>A resposta certa é...</div>
              <div className={styles.text}>{option.text}</div>
            </div>
          ) : (
            <div className={styles.wrong}>
              <div>A resposta informada está errada...</div>
              <div className={styles.text}>{option.text}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
