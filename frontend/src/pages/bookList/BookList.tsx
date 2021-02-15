import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Table } from "react-bootstrap";
import styles from "./BookList.module.scss";
import { connect } from "react-redux";
import { getBookList } from "../../redux/bookListDuck";

const MemberListRow = ({ id, name, price, stockQuantity }: any) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stockQuantity}</td>
    </tr>
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
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map(({ id, name, price, stockQuantity }: any) => (
                <MemberListRow
                  id={id}
                  name={name}
                  city={price}
                  street={stockQuantity}
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
