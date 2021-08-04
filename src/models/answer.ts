export default class AnswerModel {
  constructor(
    private text: string,
    private _isCorrect: boolean,
    private _isRevealed: boolean = false
  ) {}

  static isCorrect(text: string) {
    return new AnswerModel(text, true);
  }

  static isWrong(text: string) {
    return new AnswerModel(text, false);
  }

  get value() {
    return this.text;
  }

  get isCorrect() {
    return this._isCorrect;
  }

  get isRevealed() {
    return this._isRevealed;
  }

  reveal() {
    return new AnswerModel(this.text, this.isCorrect, true);
  }
}
