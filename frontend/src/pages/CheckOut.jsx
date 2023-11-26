import React, { useEffect } from "react";
import PaymentInfo from "../components/PaymentInfo";
import { Col, Row } from "react-bootstrap";
import ShippingInfo from "../components/ShippingInfo";
import { useDispatch, useSelector } from "react-redux";
import { ResetOrder } from "../store/Slices/orderSlice";
import { Link } from "react-router-dom";
import CartInfo from "../components/CartInfo";
import StripeContainer from "../components/stripeContainer";

const CheckOut = () => {
  const { success, orderId } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(ResetOrder());
    };
  }, []);

  return (
    <div className="pt-3">
      {success ? (
        <p>
          Order created successfully
          <Link to={`/orders/${orderId}`}>View Order</Link>
        </p>
      ) : (
        <Row>
          <Col md={6}>
            <ShippingInfo />
            <CartInfo />
          </Col>
          <Col md={6}>
            <PaymentInfo />
            <StripeContainer />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CheckOut;
