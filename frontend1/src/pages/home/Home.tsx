import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <h2>Hello Shop</h2>
      </header>
      <main>
        <Card body className={styles.card}>
          <div className={styles.pageTitle}>Hello Shop</div>
          <div className={styles.categoryBlock}>
            <div className={styles.categoryTitle}>For Members</div>
            <div className={styles.buttonGroup}>
              <Button variant="secondary">Register Member</Button>
              <Button variant="secondary">Member List</Button>
            </div>
          </div>
          <div className={styles.categoryBlock}>
            <div className={styles.categoryTitle}>For Product</div>
            <div className={styles.buttonGroup}>
              <Button variant="dark">Register Item</Button>
              <Button variant="dark">Item List</Button>
            </div>
          </div>
          <div className={styles.categoryBlock}>
            <div className={styles.categoryTitle}>For order</div>
            <div className={styles.buttonGroup}>
              <Button variant="info">Order Item</Button>
              <Button variant="info">Order list</Button>
            </div>
          </div>
        </Card>
      </main>
      <footer> Hello Shop 2021</footer>
    </div>
  );
};
//

export default Home;
