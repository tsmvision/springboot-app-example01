import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Form, Button } from "react-bootstrap";
import styles from "./RegisterMember.module.scss";

const RegisterMember = () => {
  return (
    <>
      <Header />
      <main>
        <CardBlock>
          <div className={styles.inputBlock}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Input name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Input City" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control type="text" placeholder="Input Street" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Input Zip code" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </CardBlock>
      </main>
      <Footer />
    </>
  );
};

export default RegisterMember;
