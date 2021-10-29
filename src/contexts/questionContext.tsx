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
import { getQuestions, getQuestionsDb, Question } from "../services/questions";
import OptionModel from "../models/option";

interface QuestionProviderProps {
  children: ReactNode;
}

interface QuestionContextData {
  question: QuestionModel;
  questions: QuestionModel[];
  getNextQuestionId: () => void;
  handleNextQuestion: () => void;
  finishedTime: () => void;
  selectOption: (index: number) => void;
  startQuiz: () => void;
  finishQuiz: () => void;
  loadQuestions: () => void;
}

const QuestionContext = createContext<QuestionContextData>(
  {} as QuestionContextData
);

export function QuestionProvider({ children }: QuestionProviderProps) {
  const [question, setQuestion] = useState<QuestionModel>();
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const questionRef = useRef<QuestionModel>();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

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
      await loadQuestion(questions[0]);
    }

    router.push("/quiz");
  }

  async function loadQuestion(question: QuestionModel) {
    setQuestion(question);
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
    const currentQuestion = questions.find(
      question => question.id === question.id
    );
    const nextQuestionIndex = questions.indexOf(currentQuestion) + 1;
    setQuestion(questions[nextQuestionIndex]);
    return nextQuestionIndex;
  }

  function handleNextQuestion() {
    const nextQuestionIndex = getNextQuestionId();
    console.log("NEXT QUESTION ID:", nextQuestionIndex);

    nextQuestionIndex
      ? loadQuestion(questions[nextQuestionIndex])
      : finishQuiz();
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
        getNextQuestionId,
        selectOption,
        finishedTime,
        startQuiz,
        finishQuiz,
        loadQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion(): QuestionContextData {
  return useContext(QuestionContext);
}
