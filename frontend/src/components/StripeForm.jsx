import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "./AlertMessage";
import apiClient from "../services/api-service";
import { emptyCart } from "../store/Slices/cartSlice";
import Loader from "./Loader.jsx";
import { setOrder } from "../store/Slices/orderSlice.js";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    cartItems,
    shippingAddress,
    subTotal,
    shippingPrice,
    saleTax,
    totalPrice,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (elements == null) {
      return;
    }
    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      element: elements.getElement(CardNumberElement),
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const {
      id,
      card: { last4, brand },
    } = paymentMethod;
    const payment = {
      id,
      last4,
      brand,
    };
    try {
      const body = {
        orderItems: cartItems,
        shippingAddress,
        subTotal,
        saleTax,
        shippingPrice,
        totalPrice,
        paymentMethod: payment,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await apiClient.post("/orders", body, config);
      dispatch(setOrder(data._id));
      dispatch(emptyCart());
      toast.success("Order created successfully.");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-2">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              {loading && <Loader />}
              {error && <AlertMessage>{error}</AlertMessage>}
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label">Card Number</label>
                  <CardNumberElement className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Card CVC</label>
                  <CardCvcElement className="form-control" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Card Expiry</label>
                  <CardExpiryElement className="form-control" />
                </div>
                <div className="d-grid my-3">
                  <Button type="submit" variant="primary">
                    Pay Now
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StripeForm;
