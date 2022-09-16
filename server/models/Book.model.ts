import mongoose from "mongoose";

// book schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
		title: {
			type: String,
			requied: true,
		},
		published: {
			type: Date,
			required: true,
		},
		isbn: String,
		authors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Author",
			},
		],
		pageCount: Number,
	},
	{ timestamps: true }
);

// book model
export default mongoose.model("Book", schema);
