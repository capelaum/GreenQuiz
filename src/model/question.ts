import AnswerModel from "./answer";

export default class QuestionModel {
  constructor(
    private _id: number,
    private _text: string,
    private _answers: AnswerModel[],
    private _isRight: boolean
  ) {}

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get answers() {
    return this._answers;
  }

  get isRight() {
    return this._isRight;
  }

  get isAnswered() {
    for (let answer of this._answers) {
      if (answer.isRevealed) return true;
    }

    return false;
  }
}
