import Image from "next/image";
import Logo from "../../../public/Logo.svg";
import RecyclePeople from "../../../public/recycle-people.svg";
import Result from "../../../public/result.svg";
import Recycle from "../../../public/symbols/recycle.svg";
import Trophy from "../../../public/symbols/trophy.svg";

interface MainImagesProps {
  isQuizPage?: boolean;
  recycle?: boolean;
  recyclePeople?: boolean;
  trophy?: boolean;
  result?: boolean;
}

export function MainImages({
  isQuizPage,
  recycle,
  recyclePeople,
  trophy,
  result,
}: MainImagesProps) {
  return (
    <>
      {!isQuizPage && <Image src={Logo} alt="GreenQuiz Logo" />}

      {recycle && (
        <div className="asideImg">
          <Image src={Recycle} alt="Recycle Symbol" />
        </div>
      )}

      {trophy && (
        <div className="asideImg">
          <Image src={Trophy} alt="Trophy Symbol" />
        </div>
      )}

      {recyclePeople && (
        <div className="bottomImg">
          <Image src={RecyclePeople} alt="Recycle People" />
        </div>
      )}

      {result && (
        <div className="bottomImg">
          <Image src={Result} alt="Win!" />
        </div>
      )}
    </>
  );
}
