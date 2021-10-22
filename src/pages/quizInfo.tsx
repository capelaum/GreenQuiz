import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";

import { useAuth } from "../contexts/authContext";
import { useQuestion } from "../contexts/questionContext";

import styles from "../styles/QuizInfo.module.scss";

export default function QuizInfo() {
  const { questionsIds } = useQuestion();
  const { userAuth } = useAuth();

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz | Quiz Info</title>
        <meta name="description" content="GreenQuiz | Info" />
      </Head>
      <div className="container">
        <Image src={Logo} alt="GreenQuiz Logo" />

        <h2>Informações do Quiz</h2>
        <div className={styles.quizInfo}>
          <p>
            Esse Quiz possui <strong>{questionsIds.length} questões</strong> e
            um limite de tempo de <strong>1 minuto</strong> para responder cada
            questão.
            <br />
            <br />A <strong>duração</strong> da realização do quiz será
            utilizada como critério de desempate no ranking.
            <br />
            <br />
            <span>ATENÇÃO</span>: Você só pode realizar{" "}
            <strong>1 tentativa</strong>!
            <br />
            <br />
            Boa sorte! 🍀
          </p>
        </div>

        <div className={styles.buttonsContainer}>
          <Button text="Menu" href="/" />
          <Button text="Iniciar" href="/quiz" />
        </div>
      </div>
    </>
  );
}
