import styles from "./styles.module.scss";

interface StatisticProps {
  value: any;
  text: string;
  bgColor?: string;
  fontColor?: string;
}

export default function Statistic({
  value,
  text,
  bgColor,
  fontColor,
}: StatisticProps) {
  return (
    <div className={styles.statistic}>
      <div
        className={styles.value}
        style={{
          backgroundColor: bgColor ?? "#FDD60F",
          color: fontColor ?? "#333",
        }}
      >
        {value}
      </div>
      <div className={text}>{text}</div>
    </div>
  );
}
