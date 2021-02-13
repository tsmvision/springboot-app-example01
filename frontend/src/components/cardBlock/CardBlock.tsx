import React from "react";
import styles from "./CardBlock.module.scss";
import { Card } from "react-bootstrap";

const CardBlock = ({ children }: any) => {
  return <Card className={styles.card}>{children}</Card>;
};

export default CardBlock;
