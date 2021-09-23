import Head from "next/head";
import Image from "next/image";

import { sigInWithGoogle } from "../services/auth";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Logo from "../../public/Logo.svg";
import Google from "../../public/Google.svg";

import styles from "../styles/Login.module.scss";

interface LoginProps {}

export default function Login({}) {
  const router = useRouter();
  const [user, setUser] = useState({} as any);

  console.log(user);

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
        <div
          className={styles.googleLogin}
          onClick={() => setUser(sigInWithGoogle)}
        >
          <Image src={Google} alt="Google Logo" />
          <span>Login com Google</span>
        </div>
      </div>

      {/* {user ?? <div>{JSON.stringify(user, null, 2)}</div>} */}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {},
  };
}
