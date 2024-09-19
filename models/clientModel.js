import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    googleId: {
      type: String,
    }
  },
  { timestamps: true }
);

export const Client =
  mongoose.models?.Client || mongoose.model("Client", clientSchema);
