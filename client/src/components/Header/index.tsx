import styles from "./header.module.scss";
import Link from "next/link";
import Cart from "@/components/Cart";
import { Person } from "@mui/icons-material";

export default function Header() {
  return (
    <div className={styles["container"]}>
      <div className={styles["contents"]}>

      
      <div className={styles["items"]}>
        <Link href="/" className={styles.title}>벼룩</Link>
        <div className={styles["nav-links"]}>
          <Link href="#" className={styles["nav-link"]}>
            All
          </Link>
          <Link href="#" className={styles["nav-link"]}>
            의류
          </Link>
          <Link href="#" className={styles["nav-link"]}>
            책
          </Link>
          <Link href="#" className={styles["nav-link"]}>
            신발
          </Link>
        </div>
      </div>
      <div className={styles["user"]}>
        <Cart />
        <Person className={styles["icon"]} />
        <button className={styles["add"]}>등록</button>
      </div>

      </div>
    </div>
  );
}