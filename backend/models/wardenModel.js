import mongoose from "mongoose";
//import bcrypt from "bcryptjs";

const wardenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hostelName: {
    type: String,
    required: function () {
      return this.role === "Warden"; // Required only if the role is "Warden"
    },
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Generic regex for validating emails
    trim: true,
  },
  role: {
    type: String,
    default: "Warden",
    enum: ["Warden", "ChiefWarden"], // Restricts values to either "Warden" or "ChiefWarden"
  },
});

const wardenModel =
  mongoose.models.warden || mongoose.model("Warden", wardenSchema);

// export const prepopulateChiefWarden = async () => {
//   const chiefWardenData = {
//     name: "Vaishnavi",
//     employeeId: "CW0001",
//     phoneNumber: "9999999999",
//     email: "vaishnavisrivastava864@gmail.com",
//     password: "123456789", // Plaintext for now; hashed before saving
//     role: "ChiefWarden",
//   };

//   try {
//     const existingChiefWarden = await wardenModel.findOne({
//       email: chiefWardenData.email,
//     });

//     if (!existingChiefWarden) {
//       const salt = await bcrypt.genSalt(10);
//       chiefWardenData.password = await bcrypt.hash(
//         chiefWardenData.password,
//         salt
//       );
//       await wardenModel.create(chiefWardenData);
//       console.log("Chief Warden prepopulated successfully.");
//     } else {
//       console.log("Chief Warden already exists.");
//     }
//   } catch (error) {
//     console.error("Error prepopulating Chief Warden:", error);
//   }
// };

export default wardenModel;
