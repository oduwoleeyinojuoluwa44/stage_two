import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

const connectToDB = () => {
  dotenv.config();
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDB;
