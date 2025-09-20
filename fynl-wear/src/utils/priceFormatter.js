const priceFormatter = (price) => {
  const formatted = `Rs.${price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  return formatted;
};

export default priceFormatter;
