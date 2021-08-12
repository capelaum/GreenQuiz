import Link from "next/link";

import styles from "./styles.module.scss";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export function Button({ text, href, onClick }: ButtonProps) {
  return (
    <Link href={href ?? "/"} passHref>
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    </Link>
  );
}
