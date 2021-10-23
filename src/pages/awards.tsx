import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import Jeep from "../../public/icons/jeep.svg";
import Plant from "../../public/icons/plant.svg";
import Book from "../../public/icons/book.svg";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";

import { useAuth } from "../contexts/authContext";

import styles from "../styles/Awards.module.scss";

const awardItens = [
  { place: 1, imgSrc: Jeep, imgAlt: "Jipe legal 🚗", info: "Visita ao safari" },
  {
    place: 2,
    imgSrc: Plant,
    imgAlt: "Plantinha maneira 🌱",
    info: "Semente de pau-brasil",
  },
  { place: 3, imgSrc: Book, imgAlt: "Livro top 📕", info: "Livro de Ecologia" },
];

export default function Ranking() {
  const { userAuth } = useAuth();

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Prêmios" />
      </Head>
      <div className="container">
        <Image src={Logo} alt="GreenQuiz Logo" />

        <h2>Prêmios</h2>

        <div className={styles.awardsContainer}>
          {awardItens.map((award, index) => (
            <div key={index} className={styles.awardItem}>
              <span className={styles.place}>{award.place}º Lugar</span>
              <div className={styles.info}>
                <Image src={award.imgSrc} alt={award.imgAlt} />
                <span>{award.info}</span>
              </div>
            </div>
          ))}
        </div>

        <Button text="Menu" href="/" />
      </div>
    </>
  );
}
