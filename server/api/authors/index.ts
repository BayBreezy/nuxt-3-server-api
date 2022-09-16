import AuthorModel from "~~/server/models/Author.model";

export default defineEventHandler(async (event) => {
	// return all authors
	return await AuthorModel.find();
});
