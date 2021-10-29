import QuestionModel from "../../models/question";
import OptionModel from "../../models/option";
import { getQuestions } from "../../services/questions";

export async function getQuestionsDb() {
  const firestoreQuestions = await getQuestions();

  const questions = firestoreQuestions.map(
    ({ id, text, options, category }) => {
      const questionOptions = options.map(({ text, isCorrect }) => {
        return isCorrect
          ? OptionModel.isCorrect(text)
          : OptionModel.isWrong(text);
      });

      return new QuestionModel(id, text, questionOptions, category);
    }
  );

  return questions;
}
