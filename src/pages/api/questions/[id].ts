import { NextApiRequest, NextApiResponse } from "next";
import { getQuestionsDb } from "../questionsDb";

export default async function getQuestion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const selectedId = +req.query.id;
  try {
    const questions = await getQuestionsDb();

    const selectedQuestion = questions.find(
      question => question.id === selectedId
    );

    return selectedQuestion
      ? res.status(200).json(selectedQuestion.shuffleOptions())
      : res.status(204).send("Este conteúdo não existe 😐");
  } catch (error) {
    console.error();
    console.error(`Error loading question ${selectedId}:`, error.message);
  }
}
