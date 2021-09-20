import Head from "next/head";
import React from "react";

import { Quiz } from "../components/Quiz";
import { QuizStats } from "../components/QuizStats";

import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Next Quiz" />
      </Head>

      <QuizStats />

      <Quiz />
    </div>
  );
}
