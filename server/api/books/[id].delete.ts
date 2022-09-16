import BookModel from "~~/server/models/Book.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove book
	try {
		await BookModel.findByIdAndDelete(id);
		return { message: "Book removed" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
