import Head from "next/head";
import Image from "next/image";
import Logo from "../../public/Logo.svg";

import { Button } from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";

import { useAuth } from "../contexts/authContext";

import styles from "../styles/Instructions.module.scss";

export default function Ranking() {
  const { userAuth } = useAuth();

  if (!userAuth) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Green Quiz</title>
        <meta name="description" content="Green Quiz | Instruções" />
      </Head>
      <div className="container">
        <Image src={Logo} alt="GreenQuiz Logo" />

        <h2>Instruções</h2>

        <div className={styles.instructions}>
          <p>
            Antes de iniciar o quiz, é informado quantas questões o quiz possui
            no total e o limite de tempo fixo que cada questão possui.
          </p>
          <p>
            Todas questões do quiz possuem o mesmo tempo limite, são de múltipla
            escolha e possuem <strong>4 opções de resposta</strong>, em que para
            responder uma questão, basta selecionar clicando em uma opção.
          </p>
          <p>
            <span>IMPORTANTE</span>: Ao clicar em uma opção, considera-se como
            se sua resposta já tenho sido dada e não poderá ser mais alterada!!
          </p>
          <p>
            Para passar para a próxima questão, basta clicar no botão com o
            texto “Próxima” abaixo das opções listadas da questão atual. Ao
            passar para uma próxima questão,{" "}
            <strong>
              você não poderá mais retornar à uma questão anterior
            </strong>
            .
          </p>
          <p>
            A questão e seu score atuais são dispostos no canto superior direito
            da tela de cada questão.
          </p>
          <p>
            <strong>Não são permitidas mais de 1 tentativa por quiz.</strong>
          </p>
          <p>
            Caso tenha duvidas, basta entrar em contato pelo e-mail:{" "}
            <a
              href="mailto:suporte@greenquiz.com.br"
              target="_blank"
              rel="noreferrer"
            >
              suporte@greenquiz.com.br
            </a>
          </p>
        </div>

        <Button text="Menu" href="/" />
      </div>
    </>
  );
}
