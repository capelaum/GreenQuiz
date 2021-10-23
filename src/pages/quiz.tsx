import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { LoadingScreen } from "../components/LoadingScreen";
import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";
import { MainImages } from "../components/MainImages";

import { useAuth } from "../contexts/authContext";
import { useQuestion } from "../contexts/questionContext";
import { updateUser } from "../services/firestore";

import styles from "../styles/Quiz.module.scss";

const quizBgColors = ["bg-green", "bg-yellow", "bg-blue"];

export default function QuizPage() {
  const { userAuth, user } = useAuth();
  const { question } = useQuestion();
  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);

  const onQuestionChange = useCallback(() => {
    if (question.category === "water") {
      setBackgroundColorIndex(2);
    }

    if (question.category === "energy") {
      setBackgroundColorIndex(1);
    }

    if (question.category === "recycle") {
      setBackgroundColorIndex(0);
    }
  }, [question?.category]);

  useEffect(() => {
    onQuestionChange();
  }, [onQuestionChange]);

  useEffect(() => {
    (async () => {
      if (user) {
        user.answeredQuiz = true;
        user.startTime = Date.now();
        await updateUser(user);
      }
    })();

    // onQuestionChange();
  });

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz" />
      </Head>
      <div className={`container ${quizBgColors[backgroundColorIndex]}`}>
        <div className={styles.logo}>
          <Image src={Logo} alt="GreenQuiz Logo" />
        </div>
        <MainImages recycle recyclePeople isQuizPage />

        <QuizStats />
        <Quiz />
      </div>
    </>
  );
}
