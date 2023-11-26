import { useEffect, useState } from "react";
import apiClient from "../../services/api-service.js";
import Loader from "../../components/Loader.jsx";
import AlertMessage from "../../components/AlertMessage.jsx";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { FaEye, FaTrash, FaPencil, FaPlus } from "react-icons/fa6";
import {useSelector} from "react-redux";
import {toast} from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom";


const Products = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pro, setPro] = useState([]);
  const {userInfo}=useSelector((state)=>state.auth)
  console.log(userInfo)
  const navigate=useNavigate();

  const removeItem=(id)=>{
 
    setLoading(true);
    setError(null);
    const config={
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }
    };
    apiClient
      .delete(`/products/${id}`,config)
      .then(({ data }) =>{ 
        apiClient
        .get("/products")
        .then(({ data }) => setPro(data))
        .catch((err) => {
          const message = err.response.data
            ? err.response.data.message
            : err.message;
          setError(message);
        })
        .finally(() => setLoading(false));
        console.log(data)
      })
      
      .catch((err) => {
        const message = err.response.data
          ? err.response.data.message
          : err.message;
        setError(message);
      })
      .finally(() => setLoading(false));

}


  useEffect(() => {
    setLoading(true);
    setError(null);
    apiClient
      .get("/products")
      .then(({ data }) => setPro(data))
      .catch((err) => {
        const message = err.response.data
          ? err.response.data.message
          : err.message;
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);




const createProduct=()=>{
  setLoading(true);
  setError(false);
  const config={
    headers:{
      Authorization:`Bearer ${userInfo.token}`
    }
  };
 
  apiClient
      .post("/products", null, config)
      .then(({ data }) => {
        // navigate to edit page
        console.log(data)
        navigate(`/admin/products/${data._id}`);
        toast.success("Product Created. Please edit data");
      })
      .catch((err) => {
       
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

}

  if (error) {
    <AlertMessage>{error}</AlertMessage>;
  }
  if (loading) {
    <Loader />;
  }
  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <Button className="float-end" variant="primary" onClick={()=>createProduct()}>
              <FaPlus /> Add Product
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="table" style={{ border: "1px solid muted" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT IN STOCK</th>
                </tr>
              </thead>
              <tbody>
                {pro.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <Image src={product.image} width={42} height={42} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <Button as={NavLink} to={`/products/${product._id}`} variant="light" size="sm">
                          <FaEye />
                        </Button>
                        <Button as={NavLink} to={`/admin/products/${product._id}`} variant="primary" size="sm">
                          <FaPencil />
                        </Button>
                        <Button variant="danger" size="sm" onClick={()=>removeItem(`${product._id}`)}>
                          <FaTrash />
                        </Button>
                      </div>
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

export default Products;
