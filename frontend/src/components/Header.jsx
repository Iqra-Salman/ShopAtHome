import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../store/Slices/authSlice";
import { toast } from "react-toastify";
import { emptyCart } from "../store/Slices/cartSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(removeUserInfo());
    dispatch(emptyCart());
    toast.info("User Logout");
    navigate("/auth/login");
  };

  return (
    <Navbar expand="lg" className="myNavBar" >
      <Container>
        <Navbar.Brand className="fw-bold fs-3 text-color" as={NavLink} to="/">
          ShopAtHome
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
      
        
        <Nav className="ms-auto">
          <Nav.Link  className=" fs-5 ms-5" as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link  className="fs-5  ms-5" as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link className="fs-5  ms-5"  as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link className="  fs-5 ms-5 text-black" as={NavLink} to="/cart">
              <FaCartShopping />
              Cart
              {cartItems.length > 0 && (
                <Badge className="fs-5  ms-2 bg-white ">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} className=" fs-5 ms-4 text-success" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/orders">
                  Orders
                </NavDropdown.Item>
                {userInfo.isAdmin && (
                  <NavDropdown.Item as={NavLink} to="/admin">
                    Admin
                  </NavDropdown.Item>
                )}

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handlelogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} className="  fs-5 ms-4 " variant="dark"  to="/auth/login">
                <FaUser />
                Login
              </Nav.Link>
            )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


 


    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}




export default Header;
