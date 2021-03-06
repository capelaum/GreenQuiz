import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useQuestion } from "../../contexts/questionContext";
import styles from "./styles.module.scss";

interface TimerProps {
  key: number;
  duration: number;
}

export function Timer({ duration }: TimerProps) {
  const { finishedTime } = useQuestion();

  return (
    <div className={styles.timer}>
      <CountdownCircleTimer
        duration={duration ?? 15}
        size={100}
        isPlaying
        onComplete={finishedTime}
        colors={[
          ["#2baa6d", 0.33],
          ["#F7B801", 0.33],
          ["#e44a4c", 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
}
