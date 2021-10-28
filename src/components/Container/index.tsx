import { ReactNode } from "react";

import styles from "./styles.module.scss";

interface ContainerProps {
  children: ReactNode;
  bgColor?: string;
}

export function Container({ children, bgColor }: ContainerProps) {
  return <div className={`${styles.container} ${bgColor}`}>{children}</div>;
}
