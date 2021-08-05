import React from "react";
import QuestionModel from "../../models/question";
import { Answer } from "../Answer";
import { QuestionText } from "../QuestionText";

import styles from "./styles.module.scss";

interface QuestionProps {
  question: QuestionModel;
}

export function Question({ question }: QuestionProps) {
  function renderAnswers() {
    return question.answers.map((answer, i) => {
      return (
        <Answer
          key={i}
          answer={answer}
          index={i}
          letter="A"
          letterColor="#F2C866"
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
