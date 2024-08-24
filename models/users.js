import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const usersSchema = mongoose.Schema(
  {
    name: String,
    phoneNumber: { type: String, unique: true },
    email: String,
    password: {type: String, require: [true, "password required"], minLength: [6, "weak password"]}, //TODO: make this field required & minLength & unique...
    passport: String,
    imageUrl: String,
    hasVerify: Boolean,
    userBalance: String,
    deviceToken: String,
    state: String,
  },
  { timestamps: true }
);

//TODO: active this func...
usersSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

usersSchema.statics.login = async function (phoneNumber, password) { //TODO: , password
  const user = await this.findOne({ phoneNumber });

  if (user) {
    //TODO: const auth = await bcryptjs.compare(password, user.password);
    const auth = await bcryptjs.compare(password, user.password);
    // const auth = true;
    if (auth) {
      return user;
    }
    throw Error("incurrect password");
  }
  throw Error("incurrect phone number");
};

const Users = mongoose.model("users", usersSchema);

export default Users;
