export default class AnswerModel {
  constructor(
    private _text: string,
    private _isCorrect: boolean,
    private _isRevealed: boolean = false
  ) {}

  static isCorrect(text: string) {
    return new AnswerModel(text, true);
  }

  static isWrong(text: string) {
    return new AnswerModel(text, false);
  }

  get text() {
    return this._text;
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
