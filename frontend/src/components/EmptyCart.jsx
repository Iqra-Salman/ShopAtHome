import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import findImage from "../assets/empty-cart.svg";
import Header from "./Header";
import Footer from "./Footer";

const EmptyCart = ({ text }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Header /> */}
      <div className="not-found">
        <div className=" text-center">
          <img
            src={findImage}
            alt="search"
            className="img-fluid"
            style={{ width: "350px" }}
          />
          <p className="fs-3 fw-bold">{text ? text : "Your Cart is Empty"}</p>
          <p className="pb-0">You have no item in your shopping cart.</p>
          <p>Lets go buy something!</p>
          <Link onClick={() => navigate("/")}>
            <button className="btn btn-primary mb-2">Shop Now</button>
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default EmptyCart;
