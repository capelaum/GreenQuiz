import Link from "next/link";

import styles from "./styles.module.scss";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export function Button({ text, href, onClick }: ButtonProps) {
  function renderButton() {
    return (
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    );
  }

  return href ? (
    <Link href={href} passHref>
      {renderButton()}
    </Link>
  ) : (
    renderButton()
  );
}
