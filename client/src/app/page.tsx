import Image from "next/image";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles["container"]}>
      <h1>중고거래 플랫폼 벼룩</h1>
    </div>
  );
}
