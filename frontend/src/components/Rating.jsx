import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

const Rating = ({ value, text }) => {
  const rating = [1, 2, 3, 4, 5];
  return (
    <>
      {rating.map((ratingValue, index) =>
        ratingValue <= value ? (
          <FaStar key={index} />
        ) : ratingValue - 0.5 === value ? (
          <FaStarHalfStroke key={index} />
        ) : (
          <FaRegStar key={index} />
        )
      )}
      &nbsp;<span>{text}</span>
    </>
  );
};

export default Rating;
