const ProductCard = (props) => {
  const { name, image1, price, rating, category } = props.product;

  return (
    <div>
      <div>
        <img src={image1} className="w-[80px]" />
      </div>
    </div>
  );
};

export default ProductCard;
