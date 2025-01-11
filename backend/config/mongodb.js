import mongoose from "mongoose";
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Succesfully Connected To Database")
  );
  await mongoose.connect(process.env.MONGODB_URI);
};
export default connectDB;
// import mongoose from "mongoose";
// import { prepopulateChiefWarden } from "../models/wardenModel.js"; // Correct path

// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGODB_URI);

//   mongoose.connection.on("connected", async () => {
//     console.log("Successfully Connected To Database");

//     // Call the prepopulateChiefWarden function after the connection is established
//     await prepopulateChiefWarden();
//   });

//   mongoose.connection.on("error", (error) => {
//     console.log("Error connecting to the database:", error);
//   });
// };

// export default connectDB;
