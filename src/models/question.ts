import { shuffleOptions } from "../functions/arrayFunctions";
import OptionModel from "./option";

export default class QuestionModel {
  constructor(
    private _id: number,
    private _text: string,
    private _options: OptionModel[],
    private _category: string,
    private _isRight: boolean = false
  ) {}

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get options() {
    return this._options;
  }

  get isRight() {
    return this._isRight;
  }

  get category() {
    return this._category;
  }

  get isAnswered() {
    for (let option of this.options) {
      if (option.isRevealed) return true;
    }

    return false;
  }

  get isNotAnswered() {
    return !this.isAnswered;
  }

  selectOption(index: number) {
    const isRight = this.options[index]?.isCorrect;
    const hasRevealed = this.options.some(option => option.isRevealed);

    if (hasRevealed)
      return new QuestionModel(
        this.id,
        this.text,
        this.options,
        this.category,
        isRight
      );

    const options = this.options.map((option, i) => {
      const selectedOption = index === i;
      const shouldReveal = selectedOption || option.isCorrect;
      return shouldReveal ? option.reveal() : option;
    });

    return new QuestionModel(
      this.id,
      this.text,
      options,
      this.category,
      isRight
    );
  }

  shuffleOptions() {
    let shuffledOptions = shuffleOptions(this.options);
    return new QuestionModel(
      this.id,
      this.text,
      shuffledOptions,
      this.category,
      this.isRight
    );
  }

  static createInstanceFromObject(question: QuestionModel): QuestionModel {
    const options = question._options.map(option =>
      OptionModel.createInstanceFromObject(option)
    );

    return new QuestionModel(
      question._id,
      question._text,
      options,
      question._category,
      question._isRight
    );
  }
}
