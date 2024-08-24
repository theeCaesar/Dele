import Users from "../models/users.js";

const deleteUser = async (req, res) => {
  const { phoneNumber } = req.params.num;
  try {
    const user = await Users.findOneAndDelete({ phoneNumber });
    res.status(200).json({ message: "user has been deleted" });
  } catch (err) {
    res.status(401).json({ err });
  }
};

export { deleteUser };
