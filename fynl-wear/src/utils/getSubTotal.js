const getSubTotal = (items) => {
  const subtotal = items.reduce(
    (acc, item) => acc + Number(item?.product?.price || 0) * item.quantity,
    0
  );
  return subtotal;
};

export default getSubTotal;
