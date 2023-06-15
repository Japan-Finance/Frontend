import Link from "next/link";
import styles from "./Footer.module.css";
import { UserAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
faUser;
export default function Footer() {
  const { user } = UserAuth();

  return (
    <div className={styles.footerDiv}>
      <div className={styles.footerIconDiv}>
        <Link href='/'>
          <FontAwesomeIcon icon={faHome} className={styles.footerIcon} />
          <p>Home</p>

        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        <Link href='/search'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.footerIcon}
          />
          <p>Search</p>
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        <FontAwesomeIcon icon={faMessage} className={styles.footerIcon} />
        <p>Messages</p>
      </div>
      <div className={styles.footerIconDiv}>
        <FontAwesomeIcon icon={faUser} className={styles.footerIcon} />
        <p>Profile</p>
      </div>
    </div>
  );
}
