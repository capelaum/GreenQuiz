import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Logo.svg";

import styles from "../styles/Menu.module.scss";

import { useAuth } from "../contexts/authContext";
import { LoadingScreen } from "../components/LoadingScreen";

export default function Menu() {
  const { user, signOutWithGoogle } = useAuth();

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Menu" />
      </Head>
      <div className="container">
        <Image src={Logo} alt="GreenQuiz Logo" />

        <h2 className={styles.welcomeMsg}>
          Bem vindo(a), {user ? user.displayName : "Usuário"}
        </h2>

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
          <li className={styles.exitButton} onClick={signOutWithGoogle}>
            Sair
          </li>
        </ul>
      </div>
    </>
  );
}
