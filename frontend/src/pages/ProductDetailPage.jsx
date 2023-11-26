import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/api-service";

import AlertMessage from "../components/AlertMessage";
import {
  ListGroup,
  Row,
  Col,
  Image,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { addToCart } from "../store/Slices/cartSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiClient
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  //addItemToCart
  const addItemToCart = () => {
    const payload = {
      name: product.name,
      image: product.image,
      price: product.price,
      qty: Number(qty),
      countInStock: product.countInStock,
      product: product._id,
    };
    dispatch(addToCart(payload));
    toast.success(`${product.name} added to cart`);
    navigate("/cart");
  };

  //add item to cart

  if (loading) {
    return (
      <Row className="py-5">
        <Col>
          <Loader />
        </Col>
      </Row>
    );
  }
  if (error) {
    return (
      <Row>
        <Col>
          <AlertMessage>{err.message}</AlertMessage>
        </Col>
      </Row>
    );
  }
  console.log(product);
  return (
    <Row className="py-3">
      <Col md={5}>
        <Image src={product.image} fluid />
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item as="h4">{product.name}</ListGroup.Item>
          <ListGroup.Item>
            Category <span className="float-end">{product.category}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Fabric <span className="float-end">{product.fabric}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Rating{" "}
            <span className="float-end">
              <Rating
                value={product.rating}
                text={`from ${product.numReviews} users`}
              />
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Color <span className="float-end">{product.color}</span>
          </ListGroup.Item>

          <ListGroup.Item>{product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item as="h3">Rs. {product.price} /-</ListGroup.Item>
          <ListGroup.Item>
            Stock{" "}
            <span className="float-end">
              {product.countInStock > 0 ? (
                <Badge bg="success">Available</Badge>
              ) : (
                <Badge bg="danger"> Out of Stock</Badge>
              )}
            </span>
          </ListGroup.Item>

          <ListGroup.Item>
            <Form.Select
              onChange={(e) => setQty(e.target.value)}
              disabled={product.countInStock < 1}
            >
              {[...Array(product.countInStock).keys()].map((stock) => {
                return stock < 5 ? (
                  <option key={stock} defaultValue={qty} value={stock + 1}>
                    {stock + 1}
                  </option>
                ) : null;
              })}
            </Form.Select>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                onClick={addItemToCart}
                disabled={product.countInStock < 1}
              >
                Add to Cart
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductDetailPage;
