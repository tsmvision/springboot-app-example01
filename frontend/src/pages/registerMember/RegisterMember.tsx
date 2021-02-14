import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Form, Button } from "react-bootstrap";
import styles from "./RegisterMember.module.scss";
import { connect } from "react-redux";
import { postMemberToRegister } from "../../redux/registerMemberDuck";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

interface MemberInfo {
  name: string;
  city: string;
  street: string;
  zipcode: string;
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

const RegisterMember = ({ data, postMemberData }: any) => {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postMemberData({ name, city, street, zipcode });
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
                placeholder="Input name"
                name="name"
                onChange={(e: Event) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Street"
                name="street"
                onChange={(e: Event) => setStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input City"
                name="city"
                onChange={(e: Event) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Zip code"
                name="zipcode"
                onChange={(e: Event) => setZipcode(e.target.value)}
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
  const { registerMember } = state;
  return {
    data: registerMember,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    postMemberData: ({ name, city, street, zipcode }: any) =>
      dispatch(postMemberToRegister({ name, city, street, zipcode })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMember);
