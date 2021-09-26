import Loader from "react-loader-spinner";

import styles from "./styles.module.scss";

export function LoadingScreen() {
  return (
    <div className={styles.loaderContainer}>
      <Loader
        type="Bars"
        color={"var(--purple)"}
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    </div>
  );
}
