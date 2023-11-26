import { useEffect, useState } from "react";
import apiClient from "../services/api-service";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import AlertMessage from "../components/AlertMessage";
import Banner from "../components/Banner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    apiClient
      .get("/products")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => {
        const message = err.response.data
          ? err.response.data.message
          : err.message;
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(products);


  return (
<>
<Banner/>

<Container className="py-3">
    <Row>
    <Col md={12}>
          {error && (
            <AlertMessage>
              {error}
              {loading && <Loader />}
            </AlertMessage>
          )}
        </Col>
      {products.map((product) => (
        <Col xl={3} lg={4} sm={6} xs={12} key={product._id} className="mb-3">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
    </Container>
    </>
  );
};

export default Home;
