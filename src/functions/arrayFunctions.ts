import OptionModel from "../models/option";
import QuestionModel from "../models/question";

export function shuffleNumbers(numbers: number[]): number[] {
  return numbers
    .map(value => ({ value, random: Math.random() }))
    .sort((obj1, obj2) => obj1.random - obj2.random)
    .map(obj => obj.value);
}

export function shuffleQuestions(questions: QuestionModel[]): QuestionModel[] {
  return questions
    .map(question => ({ question, random: Math.random() }))
    .sort((obj1, obj2) => obj1.random - obj2.random)
    .map(({ random, question }) => question);
}

export function shuffleOptions(options: OptionModel[]): OptionModel[] {
  return options
    .map(option => ({ option, random: Math.random() }))
    .sort((obj1, obj2) => obj1.random - obj2.random)
    .map(obj => obj.option);
}
