import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Logo.svg";

import styles from "../styles/Menu.module.scss";

export default function Menu() {
  return (
    <div className="container">
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Menu" />
      </Head>

      <Image src={Logo} alt="GreenQuiz Logo" />

      <h2 className={styles.welcomeMsg}>Bem vindo(a), Fulano</h2>

      <ul className={styles.menuList}>
        <Link href="/quizInfo" passHref>
          <li>
            <a>Iniciar Quiz</a>
          </li>
        </Link>
        <Link href="/ranking" passHref>
          <li>
            <a>Ranking</a>
          </li>
        </Link>
        <Link href="/awards" passHref>
          <li>
            <a>Prêmios</a>
          </li>
        </Link>
        <Link href="/instructions" passHref>
          <li>
            <a>Instruções</a>
          </li>
        </Link>
        <Link href="/login" passHref>
          <li className={styles.exitButton}>Sair</li>
        </Link>
      </ul>
    </div>
  );
}
