import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./styles.module.scss";

interface TimerProps {
  duration: number;
  finishedTime: () => void;
}

export function Timer({ duration, finishedTime }: TimerProps) {
  return (
    <div className={styles.timer}>
      <CountdownCircleTimer
        duration={duration}
        size={120}
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
