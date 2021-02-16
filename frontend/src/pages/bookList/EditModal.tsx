import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styles from "../registerItem/RegisterBook.module.scss";
import { updateBook } from "../../redux/book/updateBookDuck";

type Event = React.ChangeEvent<HTMLInputElement>;

const EditModal = ({ show, handleClose, currentData, updateData, isSubmit, error}: any) => {

  const [name, setName] = useState<string>(currentData.name);
  const [price, setPrice] = useState<number>(currentData.price);
  const [stockQuantity, setStockQuantity] = useState<number>(currentData.stockQuantity);
  const [author, setAuthor] = useState<string>(currentData.author);
  const [isbn, setIsbn] = useState<string>(currentData.isbn);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateData({
      id: currentData.id,
      name,
      price,
      stockQuantity,
      author,
      isbn,});
  };

  useEffect(
    () => {
      if (isSubmit && error === null) {
        handleClose();
        window.location.reload();
      }
    }
  );

  return(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.inputBlock} onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Item Name"
                name="name"
                value={name}
                onChange={(e: Event) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Price"
                name="price"
                value={price}
                onChange={(e: Event) => setPrice(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Quantity"
                name="stockQuantity"
                value={stockQuantity}
                onChange={(e: Event) => setStockQuantity(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Author"
                name="author"
                value={author}
                onChange={(e: Event) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input ISBN"
                name="isbn"
                value={isbn}
                onChange={(e: Event) => setIsbn(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isSubmit: state.updateBook.isSubmit,
    error: state.updateBook.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateData: ({
        id,
        name,
        price,
        stockQuantity,
        author,
        isbn}: any) => dispatch(
          updateBook({
            id,
            name,
            price,
            stockQuantity,
            author,
            isbn}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

