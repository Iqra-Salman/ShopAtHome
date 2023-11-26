import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo && userInfo.isAdmin) {
    return (
      <>
        <Header />
        <Container className="d-flex my-3 ">
          <ListGroup className="list-group">
            <ListGroup.Item as={NavLink} to="/admin/dashboard">
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/products">
              Products
            </ListGroup.Item>

            <ListGroup.Item as={NavLink} to="/admin/orders">
              Orders
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/admin/users">
              Users
            </ListGroup.Item>
          </ListGroup>
          <main id="adminLayout" className="w-100 mt-3">
            <Outlet />
          </main>
        </Container>
      </>
    );
  }
  return <Navigate to="/auth/login" />;
};
export default AdminLayout;
