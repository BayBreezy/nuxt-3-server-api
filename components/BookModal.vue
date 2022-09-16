<template>
	<TransitionRoot :show="open">
		<!-- Dialog -->
		<Dialog as="div" class="relative z-20" @close="closeModal">
			<!-- Dialog overlay -->
			<TransitionChild
				enter="duration-200"
				leave="duration-200"
				enter-from="opacity-0"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/30 backdrop-blur" />
			</TransitionChild>

			<!-- Full-screen scrollable container -->
			<div class="fixed inset-0 overflow-y-auto">
				<!-- Container to center the panel -->
				<div class="flex items-center justify-center min-h-full p-4">
					<!-- The actual dialog panel -->
					<TransitionChild
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl">
							<div class="flex items-center justify-between">
								<!-- Conditional rendering for text -->
								<DialogTitle class="text-xl font-medium text-gray-700"
									>{{ book._id ? "Update" : "Create" }} Author</DialogTitle
								>
							</div>
							<p class="mt-1 text-sm text-gray-500">
								{{ book._id ? "Update this author" : "Create a new author here" }}
							</p>

							<form @submit="submitBook" class="mt-5">
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div class="col-span-full">
										<FormInput rules="required" label="Title" type="text" name="title" id="title" />
									</div>
									<div class="mb-4 col-span-full">
										<FormAuthorInput v-model="authors" />
									</div>
									<div class="col-span-1">
										<FormInput
											placeholder="Select a date"
											rules="required"
											label="Published date"
											type="date"
											name="published"
											id="pub_date"
										/>
									</div>
									<div class="col-span-1">
										<FormInput label="ISBN" type="text" name="isbn" id="isbn" />
									</div>
									<div class="col-span-1">
										<FormInput
											min="0"
											rules="required|min_value:0"
											label="Page count"
											type="number"
											name="pageCount"
											id="count"
										/>
									</div>
								</div>
								<!-- Form buttons -->
								<div class="flex items-center justify-end space-x-3 mt-7">
									<button
										@click="closeModal()"
										type="button"
										class="px-4 text-sm bg-gray-100 py-2.5 rounded-md"
									>
										Cancel
									</button>
									<button type="submit" class="btn">{{ book._id ? "Update" : "Create" }}</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionRoot,
		TransitionChild,
	} from "@headlessui/vue";
	import { useForm } from "vee-validate";

	const authorStore = useAuthorStore();
	useAsyncData(() => authorStore.getAll(), { initialCache: false });

	// instantiate book store
	const bookStore = useBookStore();
	// Initial form values
	const book = ref({});
	const authors = ref([]);

	// Get function used to handle form submission and set init form values
	const { handleSubmit } = useForm({
		initialValues: book,
	});

	// Function used to update or create the record
	const submitBook = handleSubmit(async (values, ctx) => {
		if (!book.value._id) {
			// create author
			await bookStore.create({ ...values, authors: authors.value });
			closeModal();
		} else {
			// Updated author
			bookStore.update(book.value._id, { ...values, authors: authors.value });
			closeModal();
		}
	});

	// Controll state of teh modal
	const open = ref(false);
	const openModal = (item) => {
		// Set init values if an object is passed
		if (item) {
			book.value = JSON.parse(
				JSON.stringify({ ...item, published: item.published.substring(0, 10) })
			);
			authors.value = item.authors.map((a) => a._id);
		}
		open.value = true;
	};
	const closeModal = () => {
		book.value = {};
		authors.value = [];
		open.value = false;
	};

	// Expose these methods to parent components
	defineExpose({
		openModal,
		closeModal,
	});
</script>

<style></style>
