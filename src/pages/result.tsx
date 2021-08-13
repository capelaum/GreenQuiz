import { useRouter } from "next/router";
import { Button } from "../components/Button";
import Statistic from "../components/statistic";

import styles from "../styles/Result.module.scss";

export default function Results() {
  const router = useRouter();

  const total = +router.query.total;
  const score = +router.query.score;
  const percent = Math.round((score / total) * 100);

  return (
    <div className={styles.result}>
      <h1>Resultado</h1>
      <div className={styles.statisticContainer}>
        <Statistic text={"Perguntas"} value={total} />
        <Statistic text={"Score"} value={score} bgColor="#9CD2A4" />
        <Statistic
          text={"Percentual"}
          value={`${percent}%`}
          bgColor="#DE6A33"
        />
      </div>
      <Button href="/" text="Tentar novamente" />
    </div>
  );
}
