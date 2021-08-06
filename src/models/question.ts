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
    for (let answer of this.answers) {
      if (answer.isRevealed) return true;
    }

    return false;
  }

  get isNotAnswered() {
    return !this.isAnswered;
  }

  selectAnswer(index: number) {
    const isRight = this.answers[index]?.isCorrect;
    const hasRevealed = this.answers.some(answer => answer.isRevealed);

    if (hasRevealed)
      return new QuestionModel(this.id, this.text, this.answers, isRight);

    const answers = this.answers.map((answer, i) => {
      const selectedAnswer = index === i;
      const shouldReveal = selectedAnswer || answer.isCorrect;
      return shouldReveal ? answer.reveal() : answer;
    });

    return new QuestionModel(this.id, this.text, answers, isRight);
  }

  shuffleAnswers() {
    let shuffledAnswers = shuffleAnswers(this.answers);
    return new QuestionModel(this.id, this.text, shuffledAnswers, this.isRight);
  }
}
