import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import Google from "../../public/Google.svg";

import { useAuth } from "../contexts/authContext";

import styles from "../styles/Login.module.scss";

export default function Login() {
  const { userAuth, sigInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userAuth) {
      router.push("/");
    }
  }, [userAuth, router]);

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Login" />
      </Head>
      <div className="container">
        <Image src={Logo} alt="GreenQuiz Logo" />

        <div className={styles.loginBox}>
          <h3>Login</h3>
          <div className={styles.googleLogin} onClick={sigInWithGoogle}>
            <Image src={Google} alt="Google Logo" />
            <span>Login com Google</span>
          </div>
        </div>
      </div>
    </>
  );
}
