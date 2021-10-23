import { Option } from "../Option";
import { QuestionText } from "../QuestionText";
import { Timer } from "../Timer";

import { useQuestion } from "../../contexts/questionContext";

import styles from "./styles.module.scss";

const letters = [
  { value: "A", color: "#F2C866" },
  { value: "B", color: "#F266BA" },
  { value: "C", color: "#85D4F2" },
  { value: "D", color: "#BCE596" },
];

export function Question() {
  const { question } = useQuestion();

  function renderOptions() {
    return question.options.map((option, index) => {
      return (
        <Option
          key={`${question.id}-${index}`}
          option={option}
          optionIndex={index}
          letter={letters[index].value}
          letterColor={letters[index].color}
        />
      );
    });
  }

  return (
    <div className={styles.question}>
      <QuestionText text={question.text} />
      <Timer key={question.id} duration={6000} />
      {renderOptions()}
    </div>
  );
}
