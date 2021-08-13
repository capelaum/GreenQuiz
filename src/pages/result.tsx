import { useRouter } from "next/router";

import styles from "../styles/Result.module.scss";

export default function Results() {
  const router = useRouter();

  const total = +router.query.total;
  const score = +router.query.score;
  const percent = Math.round((score / total) * 100);

  return (
    <div className={styles.result}>
      <h1>Resultado</h1>
      <div>Total: {total}</div>
      <div>Score: {score}</div>
      <div>Porcentagem de acerto: {percent}%</div>
    </div>
  );
}
