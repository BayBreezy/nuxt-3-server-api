import { defineStore } from "pinia";
import { IBook } from "~~/types";
import useToast from "./useToast";

export const useBookStore = defineStore("book-store", {
	state: () => ({
		// List of all books
		books: [] as IBook[],
	}),
	actions: {
		// Get all books from DB
		async getAll() {
			try {
				let data = await $fetch<IBook[]>("/api/books");
				this.books = data;
				return data as IBook[];
			} catch (e) {
				useToast().error(e.message);
			}
		},
		// Create a new book
		async create(book: IBook) {
			await $fetch("/api/books/create", {
				method: "POST",
				body: book,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Book created");
				});
		},
		// Update a book
		async update(id: string, book: IBook) {
			await $fetch(`/api/books/${id}`, {
				method: "PUT",
				body: book,
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Book updated");
				});
		},
		// delete a book
		async remove(id: string) {
			await $fetch(`/api/books/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					useToast().error(e.data.message);
				})
				.then(async () => {
					await this.getAll();
					useToast().success("Book removed");
				});
		},
	},
});
