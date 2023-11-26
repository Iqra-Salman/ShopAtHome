import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import findItem from "/images/funny-404-error-page-design.gif";
import Header from "./Header";
import Footer from "./Footer";

const NotFound = ({ text }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-found">
        <div className=" text-center">
          <img
            src={findItem}
            alt="search"
            className="img-fluid"
            style={{ width: "350px" }}
          />
          <p className="fs-3 fw-bold">
            {text ? text : "Oops....Page not Found!"}
          </p>
          <p className="pb-0"></p>
          <p>Lets go back!</p>
          <Link onClick={() => navigate(-1)}>
            <button className="btn btn-primary mb-2">Back</button>
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default NotFound;
