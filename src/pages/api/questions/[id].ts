import { NextApiRequest, NextApiResponse } from "next";
import questions from "../questionsDb";

export default function getQuestions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const selectedId = +req.query.id;

  const selectedQuestion = questions.find(
    question => question.id === selectedId
  );

  return selectedQuestion
    ? res.status(200).json(selectedQuestion.shuffleAnswers())
    : res.status(204).send("Este conteúdo não existe 😐");
}
