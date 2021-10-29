import { NextApiRequest, NextApiResponse } from "next";
import { shuffleNumbers } from "../../../functions/arrayFunctions";
import { getQuestionsDb } from "../questionsDb";

export default async function getQuiz(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questions = await getQuestionsDb();
  const questionsIds = questions.map(question => question.id);
  res.status(200).json(shuffleNumbers(questionsIds));
}
