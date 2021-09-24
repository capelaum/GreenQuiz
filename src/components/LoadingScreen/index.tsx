import Head from "next/head";
import Image from "next/image";
import Loader from "react-loader-spinner";

import Logo from "../../../public/Logo.svg";

import styles from "./styles.module.scss";

export function LoadingScreen() {
  return (
    <div className="container">
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Loading" />
      </Head>

      <Image src={Logo} alt="GreenQuiz Logo" />

      <div className={styles.loaderContainer}>
        <Loader
          type="Bars"
          color={"var(--purple)"}
          height={80}
          width={80}
          timeout={3000} //3 secs
        />
      </div>
    </div>
  );
}
