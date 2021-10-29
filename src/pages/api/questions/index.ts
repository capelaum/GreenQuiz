import { NextApiRequest, NextApiResponse } from "next";
import { getQuestionsDb } from "../questionsDb";

export default async function getAllQuestions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questions = await getQuestionsDb();
  return questions
    ? res.status(200).json(questions)
    : res.status(204).send("Este conteúdo não existe 😐");
}
