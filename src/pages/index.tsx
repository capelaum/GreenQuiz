import Head from "next/head";
import Link from "next/link";

import { LoadingScreen } from "../components/LoadingScreen";
import { MainImages } from "../components/MainImages";

import { useAuth } from "../contexts/authContext";

import styles from "../styles/Menu.module.scss";

export default function Menu() {
  const { user, userAuth, signOutWithGoogle } = useAuth();

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Menu" />
      </Head>
      <div className="container">
        <MainImages recycle recyclePeople />

        <h2 className={styles.welcomeMsg}>
          Bem vindo(a), {user ? user.name : "Usuário"}
        </h2>

        <ul className={styles.menuList}>
          <Link href="/quizInfo" passHref>
            <li className={styles.menuBtn}>
              <a>Iniciar Quiz</a>
            </li>
          </Link>
          <Link href="/ranking" passHref>
            <li className={styles.menuBtn}>
              <a>Ranking</a>
            </li>
          </Link>
          <Link href="/awards" passHref>
            <li className={styles.menuBtn}>
              <a>Prêmios</a>
            </li>
          </Link>
          <Link href="/instructions" passHref>
            <li className={styles.menuBtn}>
              <a>Instruções</a>
            </li>
          </Link>
          <li className={styles.exitButton} onClick={signOutWithGoogle}>
            Sair
          </li>
        </ul>
      </div>
    </>
  );
}
