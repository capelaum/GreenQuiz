import React from "react";
import QuestionModel from "../../models/question";
import { Option } from "../Option";
import { QuestionText } from "../QuestionText";
import { Timer } from "../Timer";

import styles from "./styles.module.scss";

const letters = [
  { value: "A", color: "#F2C866" },
  { value: "B", color: "#F266BA" },
  { value: "C", color: "#85D4F2" },
  { value: "D", color: "#BCE596" },
];

interface QuestionProps {
  question: QuestionModel;
  onResponse: (index: number) => void;
  duration?: number;
  finishedTime: () => void;
}

export function Question({
  question,
  onResponse,
  duration,
  finishedTime,
}: QuestionProps) {
  function renderOptions() {
    return question.options.map((option, i) => {
      return (
        <Option
          key={`${question.id}-${i}`}
          option={option}
          index={i}
          letter={letters[i].value}
          letterColor={letters[i].color}
          onResponse={onResponse}
        />
      );
    });
  }

  return (
    <div className={styles.question}>
      <QuestionText text={question.text} />
      <Timer
        key={question.id}
        duration={duration ?? 15}
        finishedTime={finishedTime}
      />
      {renderOptions()}
    </div>
  );
}
