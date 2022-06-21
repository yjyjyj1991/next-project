import Link from "next/link";
import styles from "./navbar.module.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a>Home</a>
      </Link>
      {user ? (
        <a
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Logout
        </a>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}

      <Link href="/forum">
        <a>Forum</a>
      </Link>

      <Link href="/testing">
        <a>테스트</a>
      </Link>
    </div>
  );
}

export default Navbar;
