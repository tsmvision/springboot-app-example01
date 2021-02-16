import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Table } from "react-bootstrap";
import styles from "./BookList.module.scss";
import { connect } from "react-redux";
import { getBookList } from "../../redux/book/bookListDuck";
import {Button } from 'react-bootstrap';
import EditModal from './EditModal';

const MemberListRow = ({ id, name, price, stockQuantity, author, isbn }: any) => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <EditModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        currentData={{
          id,
          name,
          price,
          stockQuantity,
          author,
          isbn
        }}
      />
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stockQuantity}</td>
      <td>{author}</td>
      <td>{isbn}</td>
      <td><Button onClick={handleShow}>Edit</Button></td>
    </tr>
    </>
  );
};

const BookList = ({ bookListObject, getData }: any) => {

  useEffect(() => {
    getData();
  }, []);

  const { data } = bookListObject;
  return (
    <div>
      <Header />
      <CardBlock>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map(({ id, name, price, stockQuantity, author, isbn }: any) => (
                <MemberListRow
                  id={id}
                  name={name}
                  price={price}
                  stockQuantity={stockQuantity}
                  author={author}
                  isbn={isbn}
                />
              ))}
          </tbody>
        </Table>
      </CardBlock>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    bookListObject: state.bookList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: () => dispatch(getBookList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
