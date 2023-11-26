import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Link, NavLink } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Card>
      <Card.Img variant="top" src={product.image} height="250px" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text as="h5">Rs {product.price}/-</Card.Text>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`from ${product.numReviews} users`}
          />
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-grid'>
        <Button className="Button" as={NavLink} to={`/products/${product._id}`}>
          View Detail
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
