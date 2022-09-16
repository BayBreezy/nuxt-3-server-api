import BookModel from "~~/server/models/Book.model";

export default defineEventHandler(async (event) => {
	// get all books & populate the authors
	return await BookModel.find().populate("authors");
});
