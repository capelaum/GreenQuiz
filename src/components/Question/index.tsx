import React from "react";
import QuestionModel from "../../models/question";
import { Answer } from "../Answer";
import { QuestionText } from "../QuestionText";

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
}

export function Question({ question, onResponse }: QuestionProps) {
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
      {renderAnswers()}
    </div>
  );
}
