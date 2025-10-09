import getSubTotal from "../utils/getSubTotal";
import priceFormatter from "../utils/priceFormatter";

const SummaryCard = ({ items }) => {
  const subtotal = getSubTotal(items);
  const deliveryCharges = subtotal === 0 ? 0 : 40;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-[14px]">
        <p className="text-gray-600 font-semibold">
          Subtotal ({items.length || 0} items)
        </p>
        <p className="font-bold">{priceFormatter(subtotal)}</p>
      </div>

      <div className="flex justify-between text-[14px]">
        <p className="text-gray-600 font-semibold">Delivery Charges</p>
        <p className="font-bold">{priceFormatter(deliveryCharges)}</p>
      </div>

      {subtotal !== 0 && (
        <div className="flex justify-between text-[14px]">
          <p className="text-gray-600 font-semibold">Free Delivery</p>
          <p className="font-bold italic">
            (-{priceFormatter(deliveryCharges)})
          </p>
        </div>
      )}

      <div className="flex justify-between text-[14px]">
        <p className="text-gray-600 font-semibold">Total</p>
        <p className="font-bold">{priceFormatter(subtotal)}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
