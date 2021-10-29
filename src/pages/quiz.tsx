import { useEffect, useState, useCallback } from "react";

import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";
import { Container } from "../components/Container";
import { MainImages } from "../components/MainImages";
import { LoadingScreen } from "../components/LoadingScreen";

import QuestionModel from "../models/question";

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
      setImgProps({
        recycle: true,
        energy: false,
        water: false,
      });
    }

    if (question?.category === "energy") {
      setBgColor("bg-yellow");
      setImgProps({
        recycle: false,
        energy: true,
        water: false,
      });
    }

    if (question?.category === "water") {
      setBgColor("bg-blue");
      setImgProps({
        recycle: false,
        energy: false,
        water: true,
      });
    }
  }, [question, user, finishQuiz]);

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
      <Container bgColor={bgColor}>
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
      </Container>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const questions = await getQuestionsDb();
//     const questionsIds = shuffleNumbers(questions.map(question => question.id));

//   } catch (error) {
//     console.error(
//       "Ocorreu um erro ao pegar as questões da api:",
//       error.message
//     );
//   }

//   return {
//     props: {},
//   };
// };
