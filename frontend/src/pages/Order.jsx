import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import apiClient from "../services/api-service";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const Order = () => {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  useEffect(() => {
    setLoading(true);
    setError(false);
    apiClient
      .get(`/orders/${id}`)
      .then(({ data }) => {
        setOrder(data);
      })

      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
          console.log(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  console.log(order);
  // const orderItems = order.orderItems;

  // console.log(orderItems);
  return (
    <Container className="my-4">
      <Row>
        <Col md={12}>
          {error && (
            <AlertMessage>
              {error}
              {loading && <Loader />}
            </AlertMessage>
          )}
        </Col>
        <Col md={10}>
          <h4 className="fw-bold">{`Order # ${order._id}`}</h4>
          <h6>{`Name: ${userInfo.name}`}</h6>
          <h6>{`Email: ${userInfo.email}`}</h6>
          {/* <h6>{`Shipping Address: ${order.shippingAddress.street},${order.shippingAddress.city},54000,${order.shippingAddress.country}`}</h6> */}
          <h6>{`Payment Method:Stripe`}</h6>
        </Col>
        <Col md={8}>
          <p className="bg-success p-3 rounded">{`Order is paid at ${order.paidAt}`}</p>
          {order.isDeleiver ? (
            <p className="bg-success p-3 rounded">{`Order is delivered
              `}</p>
          ) : (
            <p className="bg-danger p-3 rounded">{`Order is not delivered
              `}</p>
          )}
        </Col>
        <Col md={12}>
          <h4 className="fw-bold">Order Items:</h4>
          <Table striped hover variant="#636976">
            <thead>
              <tr className="orderTable" variant="dark">
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Count In Stock</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems &&
                order.orderItems.map((item, index) => (
                  <tr className="orderTable" key={index}>
                    <td >
                      <img
                        src={item.image}
                        alt={item.name}
                        height={32}
                        width={32}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td className="my-2">{item.countInStock}</td>
                    <td className="my-2">{` ${
                      item.price * item.qty
                    }`}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
