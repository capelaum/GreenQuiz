import { NextApiRequest, NextApiResponse } from "next";
import questions from "../questionsDb";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(questions.map(question => question.id));
};
