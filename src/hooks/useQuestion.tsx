import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import QuestionModel from "../models/question";

interface QuestionProviderProps {
  children: ReactNode;
}

interface QuestionContextData {
  question: QuestionModel;
  questionsIds: number[];
  score: number;
  getNextQuestionId: () => void;
  handleNextQuestion: () => void;
  finishedTime: () => void;
  handleSelectedOption: (answeredQuestion: QuestionModel) => void;
  resetQuiz: () => void;
}

const QuestionContext = createContext<QuestionContextData>(
  {} as QuestionContextData
);

export function QuestionProvider({ children }: QuestionProviderProps) {
  const router = useRouter();

  const [question, setQuestion] = useState<QuestionModel>();
  const [questionsIds, setQuestionsIds] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const questionRef = useRef<QuestionModel>();

  async function loadQuestionsIds() {
    const response = await fetch("api/quiz");
    const questionIds = await response.json();

    setQuestionsIds(questionIds);
  }

  async function loadQuestion(questionId: number) {
    const response = await fetch(`api/questions/${questionId}`);
    const question = await response.json();
    const newQuestion = QuestionModel.createInstanceFromObject(question);
    setQuestion(newQuestion);
  }

  useEffect(() => {
    loadQuestionsIds();
  }, []);

  useEffect(() => {
    if (questionsIds.length > 0) {
      loadQuestion(questionsIds[0]);
    }
  }, [questionsIds]);

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  function handleSelectedOption(answeredQuestion: QuestionModel) {
    setQuestion(answeredQuestion);
    setScore(score + (answeredQuestion.isRight ? 1 : 0));
  }

  function getNextQuestionId() {
    const nextQuestionIndex = questionsIds.indexOf(question?.id) + 1;
    return questionsIds[nextQuestionIndex];
  }

  function handleNextQuestion() {
    const nextQuestionId = getNextQuestionId();
    nextQuestionId ? loadQuestion(nextQuestionId) : finishQuiz();
  }

  function finishedTime() {
    const finishedTimeQuestionId = questionRef.current.id;

    if (questionRef.current.isNotAnswered) {
      setQuestion(question.selectOption(-1));
    }

    setTimeout(() => {
      const isCurrentQuestionAnswered = questionRef.current.isAnswered;
      const isTheSameQuestion =
        finishedTimeQuestionId === questionRef.current.id;

      if (isCurrentQuestionAnswered && isTheSameQuestion) {
        handleNextQuestion();
      }
    }, 5000);
  }

  function finishQuiz() {
    router.push({
      pathname: "/result",
      query: {
        total: questionsIds.length,
        score,
      },
    });
  }

  function resetQuiz() {
    setScore(0);
    loadQuestion(questionsIds[0]);

    router.push("/");
  }

  return (
    <QuestionContext.Provider
      value={{
        question,
        questionsIds,
        score,
        handleNextQuestion,
        getNextQuestionId,
        handleSelectedOption,
        finishedTime,
        resetQuiz,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion(): QuestionContextData {
  return useContext(QuestionContext);
}
