import { useEffect, useState } from "react";
import { ButtonBG } from "./Button";
import { addAddress } from "../services/addressServices";
import { useDispatch, useSelector } from "react-redux";

const AddressForm = ({ isConfirmed }) => {
  const [formData, setFormData] = useState({});

  const user = useSelector((state) => state.auth.user);
  const shippingAddress = useSelector((state) => state.address.shippingAddress);

  useEffect(() => {
    setFormData(shippingAddress);
  }, [shippingAddress]);

  const handleFormData = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [id]: digitsOnly,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = {
      userId: user._id,
      name: formData.name,
      doorNo: formData.doorNo,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      phone: formData.phone,
    };

    try {
      const response = await addAddress(address);
      if (response.data.success) {
        isConfirmed(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white p-7 h-fit text-[14px]">
      <form className="flex flex-col w-[250px]" onSubmit={handleSubmit}>
        <p className="text-center mb-4 font-semibold text-[#333] text-xl">
          Address Detail
        </p>
        <label htmlFor="name" className="mb-1 font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px] outline-0"
          onChange={handleFormData}
          value={formData?.name}  
        />
        <label htmlFor="doorNo" className="mb-1 font-semibold text-gray-700">
          Door No
        </label>
        <input
          type="text"
          id="doorNo"
          placeholder="Door No."
          className="rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px] outline-0"
          onChange={handleFormData}
          value={formData?.doorNo}
        />

        <label htmlFor="street" className="mb-1 font-semibold text-gray-700">
          Street
        </label>
        <input
          type="text"
          id="street"
          placeholder="Street"
          className="rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px] outline-0"
          onChange={handleFormData}
          value={formData?.street}
        />

        <label htmlFor="city" className="mb-1 font-semibold text-gray-700">
          City
        </label>
        <input
          type="text"
          placeholder="City"
          id="city"
          className="outline-0 rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px]"
          onChange={handleFormData}
          value={formData?.city}
        />

        <label htmlFor="state" className="mb-1 font-semibold text-gray-700">
          State
        </label>
        <input
          type="text"
          placeholder="State"
          id="state"
          className="rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px] outline-0"
          onChange={handleFormData}
          value={formData?.state}
        />

        <label htmlFor="pincode" className="mb-1 font-semibold text-gray-700">
          Pincode
        </label>
        <input
          type="number"
          placeholder="Pincode"
          id="pincode"
          className="rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px] outline-0"
          onChange={handleFormData}
          value={formData?.pincode}
        />

        <label htmlFor="phone" className="mb-1 font-semibold text-gray-700">
          Mobile No.
        </label>
        <input
          type="number"
          placeholder="Mobile No."
          id="phone"
          className="rounded-md border border-purple-400 px-2 py-1 mb-3 text-[14px] outline-0"
          onChange={handleFormData}
          value={formData?.phone}
        />

        <div className="mt-3">
          <ButtonBG text="Confirm" width="w-full" btnType="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
