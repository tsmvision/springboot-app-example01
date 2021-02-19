import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Form, Button } from "react-bootstrap";
import styles from "./RegisterBook.module.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { getMemberList } from "../../redux/memberListDuck";
import { getBookList } from "../../redux/book/bookListDuck";
import { postCreateOrder } from "../../redux/registerOrderDuck";

// interface BookInfo {
//   name: string;
//   price: number;
//   stockQuantity: number;
//   author: string;
//   isbn: string;
// }

// type Event = React.ChangeEvent<HTMLInputElement>;
//
// const RedirectToHome = ({ isRedirect = false }: any) => {
//   return <>{isRedirect && <Redirect to="/" />}</>;
// };
//
// interface ErrorMessageProps {
//   errorMessage: string;
// }
//
// const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
//   return <Alert variant="danger">{errorMessage}</Alert>;
// };

// TODO: get member list data when select select component
// TODO: get item list data when select "select" component
// TODO: create POST api endpoint in the backend to save user, product, and quantity

interface MemberList {
  id: string;
  name: string;
}

const RegisterOrder = ({
  memberList,
  getMemberList,
  bookList,
  getBookList,
  createOrder,
}: any) => {
  const [memberId, setMemberId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const savedMemberList = useMemo(() => {
    return memberList?.data || [];
  }, [memberList]);

  const savedBookList = useMemo(() => {
    return bookList?.data || [];
  }, [bookList]);

  const handleMemberSelect = (e: any) => {
    console.log("handleMemberSelect!!!", e.target.value);
    setMemberId(e.target.value);
  };

  const handleBookSelect = (e: any) => {
    console.log("handleBookSelect!!!", e.target.value);
    setProductId(e.target.value);
  };

  const handleCount = (e: any) => {
    setCount(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postBookData({name, price, stockQuantity, author, isbn});
    createOrder({});
  };
  //
  useEffect(() => {
    getMemberList();
    getBookList();
  }, []);

  return (
    <>
      {/*<>{data.error && <ErrorMessage errorMessage={data.error} />}</>*/}
      {/*<RedirectToHome*/}
      {/*  isRedirect={data.isSubmit === true && data.error === null}*/}
      {/*/>*/}
      <Header />
      <main>
        <CardBlock>
          <form className={styles.inputBlock} onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Select Member</Form.Label>
              <Form.Control
                as="select"
                onChange={handleMemberSelect}
                value={memberId}
              >
                {savedMemberList?.map(({ id, name }: any, index: number) => (
                  <option key={index + id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Product</Form.Label>
              <Form.Control
                as="select"
                onChange={handleBookSelect}
                value={productId}
              >
                {savedBookList.map(({ id, name }: any, index: number) => (
                  <option key={index + id} value={id}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Quantity"
                name="quantity"
                onChange={(e: any) => setCount(parseInt(e.target.value))}
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
  const { memberList, bookList } = state;
  return {
    memberList,
    bookList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMemberList: () => dispatch(getMemberList()),
    getBookList: () => dispatch(getBookList()),
    createOrder: ({ memberId, productId, count }: any) =>
      dispatch(postCreateOrder({ memberId, productId, count })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOrder);
