import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Form, Button } from "react-bootstrap";
import styles from "./RegisterBook.module.scss";
import { connect } from "react-redux";
import { postBookToRegister } from "../../redux/registerBookDuck";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

interface BookInfo {
  name: string;
  price: number;
  stockQuantity: number;
  author: string;
  isbn: string;
}

type Event = React.ChangeEvent<HTMLInputElement>;

const RedirectToHome = ({ isRedirect = false }: any) => {
  return <>{isRedirect && <Redirect to="/" />}</>;
};

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert variant="danger">{errorMessage}</Alert>;
};

const RegisterBook = ({ data, postBookData }: any) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postBookData({name, price, stockQuantity, author, isbn});
  };

  return (
    <>
      <>{data.error && <ErrorMessage errorMessage={data.error} />}</>
      <RedirectToHome
        isRedirect={data.isSubmit === true && data.error === null}
      />
      <Header />
      <main>
        <CardBlock>
          <form className={styles.inputBlock} onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Item Name"
                name="name"
                onChange={(e: Event) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Price"
                name="price"
                onChange={(e: Event) => setPrice(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Quantity"
                name="city"
                onChange={(e: Event) => setStockQuantity(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Author"
                name="author"
                onChange={(e: Event) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input ISBN"
                name="isbn"
                onChange={(e: Event) => setIsbn(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </CardBlock>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { registerBook } = state;
  return {
    data: registerBook,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    postBookData: ({ name, price, stockQuantity, author, isbn }: any) => {
      return dispatch(postBookToRegister( {name, price, stockQuantity, author, isbn}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBook);
