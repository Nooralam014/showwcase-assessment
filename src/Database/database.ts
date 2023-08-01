import mongoose from "mongoose";

const connection = () => {
  mongoose.connect(`${process.env.DATABASE_CONNECTION}`);
};

export default connection;
