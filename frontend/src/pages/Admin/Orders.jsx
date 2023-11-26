import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-service";
import { Col, Container, Row, Table } from "react-bootstrap";
import AlertMessage from "../../components/AlertMessage";
import Loader from "../../components/Loader";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    apiClient
      .get("/orders")
      .then(({ data }) => {
        setOrder(data);
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
  const { orderItems } = order;
  console.log(orderItems);
  // const length = orderItems.length();
  console.log(order);
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
                  <th>Order No. </th>
                  <th>Order Date </th>

                  <th>User Id </th>
                  <th>No. of Products</th>
                  <th>Total Bill</th>
                  <th>Order Delivered</th>
                  <th>View Order</th>
                </tr>
              </thead>
              <tbody>
                {order.map((order, index) => (
                  <tr key={index}>
                    <td className="order_row">{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.user}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isDeleiver ? "Yes" : "No"}</td>

                    <td>
                      <Link to={`/orders/${order._id}`}>
                        <FaEye />
                      </Link>
                    </td>
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

export default Orders;
