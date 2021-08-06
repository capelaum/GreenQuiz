import styles from "./styles.module.scss";

interface QuestionTextProps {
  text: string;
}

export function QuestionText({ text }: QuestionTextProps) {
  return (
    <div className={styles.questionTextContainer}>
      <div className={styles.questionText}>
        <h2>{text}</h2>
      </div>
    </div>
  );
}
