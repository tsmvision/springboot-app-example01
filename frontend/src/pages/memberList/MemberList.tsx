import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardBlock from "../../components/cardBlock/CardBlock";
import { Table } from "react-bootstrap";
import styles from "./MemberList.module.scss";
import { connect } from "react-redux";
import { getMemberList } from "../../redux/memberListDuck";

const MemberListRow = ({ id, name, city, street, zipcode }: any) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{city}</td>
      <td>{street}</td>
      <td>{zipcode}</td>
    </tr>
  );
};

const MemberList = ({ memberListObject, getData }: any) => {
  useEffect(() => {
    getData();
  }, []);

  const { data } = memberListObject;
  return (
    <div>
      <Header />
      <CardBlock>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Street</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map(({ id, name, city, street, zipcode }: any) => (
                <MemberListRow
                  id={id}
                  name={name}
                  city={city}
                  street={street}
                  zipcode={zipcode}
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
    memberListObject: state.memberList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getData: () => dispatch(getMemberList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
