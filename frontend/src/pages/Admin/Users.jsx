import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-service";
import { Col, Container, Row, Table } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import Loader from "../../components/Loader";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);
  useEffect(() => {
    apiClient
      .get("/auth/users")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        const message = err.response.data
          ? err.response.data.messgae
          : err.message;
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const { userItems } = user;
  console.log(userItems);
  // const length = userItems.length();
  console.log(user);
  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            {error && <AlertMessage>{error}</AlertMessage>}
            {loading && <Loader />}
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped>
              <thead>
                <tr>
                  <th>User Id </th>
                  <th>Name </th>

                  <th>Email </th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Users;
