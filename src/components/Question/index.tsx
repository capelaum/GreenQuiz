import React from "react";
import QuestionModel from "../../models/question";
import { Answer } from "../Answer";
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
  function renderAnswers() {
    return question.answers.map((answer, i) => {
      return (
        <Answer
          key={i}
          answer={answer}
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
      <Timer duration={duration ?? 15} finishedTime={finishedTime} />
      {renderAnswers()}
    </div>
  );
}
