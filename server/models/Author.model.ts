import mongoose from "mongoose";

// author schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			requied: true,
		},
	},
	{ timestamps: true }
);

// author model
export default mongoose.model("Author", schema);
