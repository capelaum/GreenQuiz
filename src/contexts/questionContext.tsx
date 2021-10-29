import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

import { useAuth } from "./authContext";
import { updateUser } from "../services/firestore";

import QuestionModel from "../models/question";

interface QuestionProviderProps {
  children: ReactNode;
}

interface QuestionContextData {
  question: QuestionModel;
  questionsIds: number[];
  getNextQuestionId: () => void;
  handleNextQuestion: () => void;
  finishedTime: () => void;
  selectOption: (index: number) => void;
  startQuiz: () => void;
  finishQuiz: () => void;
  loadQuestionsIds: () => void;
}

const QuestionContext = createContext<QuestionContextData>(
  {} as QuestionContextData
);

export function QuestionProvider({ children }: QuestionProviderProps) {
  const [question, setQuestion] = useState<QuestionModel>();
  const [questionsIds, setQuestionsIds] = useState<number[]>([]);
  const questionRef = useRef<QuestionModel>();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  async function loadQuestionsIds() {
    const response = await fetch("api/quiz");
    const questionIds = await response.json();
    setQuestionsIds(questionIds);
  }

  async function startQuiz() {
    // if (user.answeredQuiz) {
    //   toast.warn("Você já realizou esse quiz.. 😅", {
    //     theme: "colored",
    //   });
    //   return router.push("/");
    // }

    toast.success("Boa sorte!", {
      theme: "light",
      position: "top-left",
      icon: "🍀",
    });

    user.answeredQuiz = true;
    user.startTime = Date.now();
    user.score = 0;
    await updateUser(user);

    if (questionsIds.length > 0) {
      await loadQuestion(questionsIds[0]);
    }

    router.push("/quiz");
  }

  async function loadQuestion(questionId: number) {
    try {
      const response = await fetch(`api/questions/${questionId}`);
      const question = await response.json();
      const newQuestion = QuestionModel.createInstanceFromObject(question);
      setQuestion(newQuestion);
    } catch (error) {
      console.error(`Error loading question ${questionId}:`, error.message);
    }
  }

  async function selectOption(index: number) {
    if (question.isNotAnswered) {
      const answeredQuestion = question.selectOption(index);
      setQuestion(answeredQuestion);
      // setScore(score + (answeredQuestion.isRight ? 1 : 0));
      answeredQuestion.isRight
        ? toast.success("Você acertou!", {
            theme: "colored",
            position: "top-left",
          })
        : toast.error("Você errou..", {
            theme: "colored",
            position: "top-left",
          });
      user.score += answeredQuestion.isRight ? 1 : 0;
      await updateUser(user);
    }
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
      selectOption(-1);
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

  async function finishQuiz() {
    toast(`Parabéns ${user.name}, você finalizou o quiz!!`, {
      theme: "light",
      icon: "🎉",
    });
    user.endTime = Date.now();
    user.duration = user.endTime - user.startTime;
    await updateUser(user);
    router.push({
      pathname: "/result",
    });
  }

  return (
    <QuestionContext.Provider
      value={{
        question,
        questionsIds,
        handleNextQuestion,
        getNextQuestionId,
        selectOption,
        finishedTime,
        startQuiz,
        finishQuiz,
        loadQuestionsIds,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion(): QuestionContextData {
  return useContext(QuestionContext);
}
