import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { Button } from "../components/Button";

export default function Ranking() {
  return (
    <div className="container">
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Ranking" />
      </Head>

      <Image src={Logo} alt="GreenQuiz Logo" />

      <h2>Ranking</h2>

      <Button text="Menu" href="/" />
    </div>
  );
}
