import { NextApiRequest, NextApiResponse } from "next";
import questions from "../questionsDb";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const selectedId = +req.query.id;

  const selectedQuestion = questions.find(
    question => question.id === selectedId
  );

  if (selectedQuestion) {
    res.status(200).json(selectedQuestion);
  } else {
    res.status(204).send("Este conteúdo não existe 😐");
  }
};
