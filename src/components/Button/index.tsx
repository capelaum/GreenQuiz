import Link from "next/link";

import styles from "./styles.module.scss";

interface ButtonProps {
  disabled?: boolean;
  text: string;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export function Button({ disabled, text, href, onClick }: ButtonProps) {
  function renderButton() {
    return (
      <button className={styles.button} onClick={onClick} disabled={disabled}>
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
