import Head from "next/head";
import Image from "next/image";

import Logo from "../../public/Logo.svg";

import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";

export default function QuizPage() {
  return (
    <div className="container">
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="GreenQuiz | Menu" />
      </Head>

      <QuizStats />
      <Quiz />
    </div>
  );
}
