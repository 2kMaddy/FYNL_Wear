import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, name, phone, doorNo, street, city, state, pincode } =
      req.body;

    const existingAddress = await Address.findOne({ userId });

    if (existingAddress) {
      for (let field in req.body) {
        existingAddress[field] = req.body[field];
      }
      await existingAddress.save();

      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: existingAddress,
      });
    } else {
      const newAddress = await Address.create({
        userId,
        name,
        phone,
        doorNo,
        street,
        city,
        state,
        pincode,
      });
      return res.status(200).json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add address",
      error: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = await Address.findOne({ userId });
    return res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Fetch user address failed",
      error: error.message,
    });
  }
};
