import styles from "./styles.module.scss";

interface QuizStatsProps {
  value: any;
  text: string;
  bgColor?: string;
  fontColor?: string;
}

export function QuizStats({ value, text, bgColor, fontColor }: QuizStatsProps) {
  return (
    <div className={styles.statistic}>
      <h3 className={styles.text}>{text}</h3>
      <div
        className={styles.value}
        style={{
          backgroundColor: bgColor ?? "#FDD60F",
          color: fontColor ?? "#333",
        }}
      >
        {value}
      </div>
    </div>
  );
}
