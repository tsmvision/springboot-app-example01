import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Home</Link>
      <h2>Hello Shop</h2>
    </header>
  );
};

export default Header;
