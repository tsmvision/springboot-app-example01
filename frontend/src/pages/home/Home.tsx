import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <CardBlock>
          <div className={styles.pageTitle}>Hello Shop</div>
          <div className={styles.categoryBlock}>
            <div className={styles.categoryTitle}>For Members</div>
            <div className={styles.buttonGroup}>
              <Link to="/register-member">
                <Button variant="secondary">Register Member</Button>
              </Link>
              <Link to="/member-list">
                <Button variant="secondary">Member List</Button>
              </Link>
            </div>
          </div>
          <div className={styles.categoryBlock}>
            <div className={styles.categoryTitle}>For Product</div>
            <div className={styles.buttonGroup}>
              <Link to="/register-item">
                <Button variant="dark">Register Item</Button>
              </Link>
              <Link to="/item-list">
                <Button variant="dark">Item List</Button>
              </Link>
            </div>
          </div>
          <div className={styles.categoryBlock}>
            <div className={styles.categoryTitle}>For order</div>
            <div className={styles.buttonGroup}>
              <Link to="/register-order">
                <Button variant="info">Order Item</Button>
              </Link>

              <Button variant="info">Order list</Button>
            </div>
          </div>
        </CardBlock>
      </main>
      <Footer />
    </>
  );
};

export default Home;
