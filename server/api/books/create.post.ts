import BookModel from "~~/server/models/Book.model";
import { BookSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { error } = BookSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create book
	try {
		await BookModel.create(body);
		return { message: "Book created" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
