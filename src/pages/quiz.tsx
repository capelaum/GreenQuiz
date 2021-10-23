import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";
import { MainImages } from "../components/MainImages";
import { LoadingScreen } from "../components/LoadingScreen";

import { useAuth } from "../contexts/authContext";
import { useQuestion } from "../contexts/questionContext";

import styles from "../styles/Quiz.module.scss";

export default function QuizPage() {
  const { question, finishQuiz } = useQuestion();
  const { userAuth, user } = useAuth();
  const [bgColor, setBgColor] = useState("bg-green");
  const [imgProps, setImgProps] = useState({
    recycle: true,
    energy: false,
    water: false,
  });

  const onQuestionChange = useCallback(async () => {
    if (!question && user) {
      finishQuiz();
    }

    if (question?.category === "recycle") {
      setBgColor("bg-green");
      imgProps.recycle = true;
      imgProps.water = false;
      imgProps.energy = false;
      setImgProps(imgProps);
    }

    if (question?.category === "energy") {
      setBgColor("bg-yellow");
      imgProps.energy = true;
      imgProps.water = false;
      imgProps.recycle = false;
      setImgProps(imgProps);
    }

    if (question?.category === "water") {
      setBgColor("bg-blue");
      imgProps.water = true;
      imgProps.energy = false;
      imgProps.recycle = false;
      setImgProps(imgProps);
    }
  }, [question, imgProps, user, finishQuiz]);

  useEffect(() => {
    onQuestionChange();
  }, [onQuestionChange]);

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz" />
      </Head>
      <div className={`container ${bgColor}`}>
        <div className={styles.logo}>
          <Image src={Logo} alt="GreenQuiz Logo" />
        </div>

        <MainImages isQuizPage {...imgProps} />
        {question && (
          <>
            <QuizStats />
            <Quiz />
          </>
        )}
      </div>
    </>
  );
}
