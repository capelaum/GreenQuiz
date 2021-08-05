import Head from "next/head";
import Image from "next/image";

import { Question } from "../components/Question";
import AnswerModel from "../models/answer";
import QuestionModel from "../models/question";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const questionTest = new QuestionModel(1, "Melhor cor?", [
    AnswerModel.isWrong("Verde"),
    AnswerModel.isWrong("Vermelha"),
    AnswerModel.isWrong("Azul"),
    AnswerModel.isCorrect("Preta"),
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next Quiz | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.questionContainer}>
        <Question question={questionTest} />
      </div>
    </div>
  );
}
