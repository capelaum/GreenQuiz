import { shuffleAnswers } from "../functions/arrayFunctions";
import AnswerModel from "./answer";

export default class QuestionModel {
  constructor(
    private _id: number,
    private _text: string,
    private _answers: AnswerModel[],
    private _isRight: boolean = false
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

  shuffleAnswers(): QuestionModel {
    let shuffledAnswers = shuffleAnswers(this._answers);
    return new QuestionModel(
      this._id,
      this._text,
      shuffledAnswers,
      this._isRight
    );
  }
}
