export default class AnswerModel {
  constructor(
    private _value: string,
    private _isCorrect: boolean,
    private _isRevealed: boolean = false
  ) {}

  static isCorrect(value: string) {
    return new AnswerModel(value, true);
  }

  static isWrong(value: string) {
    return new AnswerModel(value, false);
  }

  get value() {
    return this._value;
  }

  get isCorrect() {
    return this._isCorrect;
  }

  get isRevealed() {
    return this._isRevealed;
  }
}
