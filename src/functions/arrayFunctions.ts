import AnswerModel from "../model/answer";

export function shuffleNumbers(numbers: number[]): number[] {
  return numbers
    .map(value => ({ value, aleatory: Math.random() }))
    .sort((obj1, obj2) => obj1.aleatory - obj2.aleatory)
    .map(obj => obj.value);
}

export function shuffleAnswers(answers: AnswerModel[]): AnswerModel[] {
  return answers
    .map(answer => ({ answer, aleatory: Math.random() }))
    .sort((obj1, obj2) => obj1.aleatory - obj2.aleatory)
    .map(obj => obj.answer);
}
