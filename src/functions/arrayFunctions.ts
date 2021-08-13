import OptionModel from "../models/option";

export function shuffleNumbers(numbers: number[]): number[] {
  return numbers
    .map(value => ({ value, aleatory: Math.random() }))
    .sort((obj1, obj2) => obj1.aleatory - obj2.aleatory)
    .map(obj => obj.value);
}

export function shuffleOptions(options: OptionModel[]): OptionModel[] {
  return options
    .map(option => ({ option, aleatory: Math.random() }))
    .sort((obj1, obj2) => obj1.aleatory - obj2.aleatory)
    .map(obj => obj.option);
}
