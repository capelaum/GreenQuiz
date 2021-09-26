import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { LoadingScreen } from "../components/LoadingScreen";
import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";

import { useAuth } from "../contexts/authContext";
import { updateUser } from "../services/firestore";

import styles from "../styles/Quiz.module.scss";

export default function QuizPage() {
  const { userAuth, user } = useAuth();
  user.answeredQuiz = true;
  user.startTime = Date.now();

  useEffect(() => {
    (async () => {
      if (user) {
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
      <div className="container">
        <div className={styles.logo}>
          <Image src={Logo} alt="GreenQuiz Logo" />
        </div>

        <QuizStats />
        <Quiz />
      </div>
    </>
  );
}
