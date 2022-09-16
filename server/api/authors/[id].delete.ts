import AuthorModel from "~~/server/models/Author.model";
import { AuthorSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove author
	try {
		await AuthorModel.findByIdAndDelete(id);
		return { message: "Author removed" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
