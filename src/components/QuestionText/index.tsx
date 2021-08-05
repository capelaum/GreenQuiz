import styles from "./styles.module.scss";

interface QuestionTextProps {
  text: string;
}

export function QuestionText({ text }: QuestionTextProps) {
  return (
    <div className={styles.questionText}>
      <div className={styles.text}>
        <span>{text}</span>
      </div>
    </div>
  );
}
