import styles from "./styles.module.scss";

interface ResultStatisticProps {
  value: number | string;
  text: string;
  bgColor?: string;
  fontColor?: string;
}

export function ResultStatistic({
  value,
  text,
  bgColor,
  fontColor,
}: ResultStatisticProps) {
  return (
    <div className={styles.statistic}>
      <h3 className={styles.text}>{text}</h3>
      <div
        className={styles.value}
        style={{
          backgroundColor: bgColor ?? "var(--purple)",
          color: fontColor ?? "#FFF",
        }}
      >
        {value}
      </div>
    </div>
  );
}
