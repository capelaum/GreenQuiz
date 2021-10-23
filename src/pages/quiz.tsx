import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { LoadingScreen } from "../components/LoadingScreen";
import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";

import { useAuth } from "../contexts/authContext";
import { updateUser } from "../services/firestore";

import styles from "../styles/Quiz.module.scss";
import { MainImages } from "../components/MainImages";

const quizBgColors = ["bg-green", "bg-yellow", "bg-blue"];

export default function QuizPage() {
  const { userAuth, user } = useAuth();
  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);

  const onQuestionChange = () => {
    const newBackgroundColorIndex = (backgroundColorIndex + 1) % 3;
    setBackgroundColorIndex(newBackgroundColorIndex);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        user.answeredQuiz = true;
        user.startTime = Date.now();
        await updateUser(user);
      }
    })();
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
        <Quiz onQuestionChange={onQuestionChange} />
      </div>
    </>
  );
}
