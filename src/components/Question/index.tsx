import React from "react";
import { useQuestion } from "../../hooks/useQuestion";
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

export function Question() {
  const { question, handleSelectedOption } = useQuestion();

  function selectOption(index: number) {
    if (question.isNotAnswered) {
      handleSelectedOption(question.selectOption(index));
    }
  }

  function renderOptions() {
    return question.options.map((option, i) => {
      return (
        <Option
          key={`${question.id}-${i}`}
          option={option}
          index={i}
          letter={letters[i].value}
          letterColor={letters[i].color}
          selectOption={selectOption}
        />
      );
    });
  }

  return (
    <div className={styles.question}>
      <QuestionText text={question.text} />
      <Timer key={question.id} duration={5} />
      {renderOptions()}
    </div>
  );
}
