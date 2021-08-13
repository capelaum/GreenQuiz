export default class OptionModel {
  constructor(
    private _text: string,
    private _isCorrect: boolean,
    private _isRevealed: boolean = false
  ) {}

  static isCorrect(text: string) {
    return new OptionModel(text, true);
  }

  static isWrong(text: string) {
    return new OptionModel(text, false);
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
    return new OptionModel(this.text, this.isCorrect, true);
  }

  static createInstanceFromObject(option: OptionModel): OptionModel {
    return new OptionModel(option._text, option._isCorrect, option._isRevealed);
  }
}
