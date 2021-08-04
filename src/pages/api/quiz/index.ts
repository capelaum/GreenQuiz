import { NextApiRequest, NextApiResponse } from "next";
import { shuffleNumbers } from "../../../functions/arrayFunctions";
import questions from "../questionsDb";

export default function getQuiz(req: NextApiRequest, res: NextApiResponse) {
  const questionsIds = questions.map(question => question.id);
  res.status(200).json(shuffleNumbers(questionsIds));
}
