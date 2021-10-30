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
import { getQuestions } from "../services/questions";

interface QuestionProviderProps {
  children: ReactNode;
}

interface QuestionContextData {
  question: QuestionModel;
  questions: QuestionModel[];
  handleNextQuestion: () => void;
  finishedTime: () => void;
  selectOption: (index: number) => void;
  startQuiz: () => void;
  finishQuiz: () => void;
  currentQuestionIndex: number;
}

const QuestionContext = createContext<QuestionContextData>(
  {} as QuestionContextData
);

export function QuestionProvider({ children }: QuestionProviderProps) {
  const [question, setQuestion] = useState<QuestionModel>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const questionRef = useRef<QuestionModel>();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (question) {
      questionRef.current = question;
    }
    return () => {
      questionRef.current = undefined;
    };
  }, [question]);

  useEffect(() => {
    if (router.pathname === "/quizInfo") {
      console.log("Loading questions...");
      loadQuestions();
    }
  }, [router.pathname]);

  async function loadQuestions() {
    const questions = await getQuestions();
    setQuestions(questions);
  }

  async function startQuiz() {
    // if (user.answeredQuiz) {
    //   toast.warn("Você já realizou esse quiz.. 😅", {
    //     theme: "colored",
    //   });
    //   return router.push("/");
    // }
    setCurrentQuestionIndex(0);

    toast.success("Boa sorte!", {
      theme: "light",
      position: "top-left",
      icon: "🍀",
    });

    user.answeredQuiz = true;
    user.startTime = Date.now();
    user.score = 0;
    await updateUser(user);

    if (questions.length > 0) {
      setQuestion(questions[currentQuestionIndex]);
    }

    router.push("/quiz");
  }

  async function selectOption(index: number) {
    if (question.isNotAnswered) {
      const answeredQuestion = question.selectOption(index);
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

      const updatedQuestions = questions;
      updatedQuestions[currentQuestionIndex] = answeredQuestion;

      setQuestions(updatedQuestions);
      setQuestion(questions[currentQuestionIndex]);

      user.score += answeredQuestion.isRight ? 1 : 0;
      await updateUser(user);
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length) {
      setQuestion(questions[currentQuestionIndex + 1]);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);

    if (currentQuestionIndex === questions.length) {
      finishQuiz();
    }
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
        questions,
        handleNextQuestion,
        selectOption,
        finishedTime,
        startQuiz,
        finishQuiz,
        currentQuestionIndex,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion(): QuestionContextData {
  return useContext(QuestionContext);
}
