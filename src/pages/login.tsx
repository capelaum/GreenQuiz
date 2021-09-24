import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../hooks/useAuth";

import Logo from "../../public/Logo.svg";
import Google from "../../public/Google.svg";

import styles from "../styles/Login.module.scss";

export default function Login() {
  const { user, sigInWithGoogle } = useAuth();
  console.log("🚀 ~ user", user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="container">
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Login" />
      </Head>
      <Image src={Logo} alt="GreenQuiz Logo" />

      <div className={styles.loginBox}>
        <h3>Login</h3>
        <div className={styles.googleLogin} onClick={sigInWithGoogle}>
          <Image src={Google} alt="Google Logo" />
          <span>Login com Google</span>
        </div>
      </div>

      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : false}
    </div>
  );
}
