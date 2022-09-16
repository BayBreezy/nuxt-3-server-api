<template>
	<div class="min-h-screen">
		<main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
			<!-- Page title -->
			<h1 class="text-2xl font-medium">Books</h1>
			<p class="mt-2 text-sm text-gray-500">Manage your books here</p>

			<div
				class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
			>
				<div class="relative w-full md:mr-10 grow">
					<span class="absolute -translate-y-1/2 top-1/2 left-3">
						<Icon name="ep:search" size="24" class="text-gray-400" />
					</span>
					<input
						placeholder="Search books..."
						v-model="search"
						type="search"
						name="search"
						id="search"
						class="pl-11 input"
					/>
				</div>
				<button
					@click="bookModal.openModal()"
					class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
				>
					Add Book
				</button>
			</div>

			<div class="relative mt-5 border border-gray-100 rounded-lg">
				<ClientOnly>
					<EasyDataTable
						:search-value="search"
						empty-message="No Book Found"
						theme-color="#f97316"
						table-class-name="eztble"
						:headers="headers"
						:items="bookStore.books"
					>
						<!-- Show title with custom styles -->
						<template #item-title="{ title }">
							<span class="font-semibold">{{ title }}</span>
						</template>
						<template #item-published="{ published }">
							<span>{{ dayjs(published).format("MMM DD, YYYY") }}</span>
						</template>
						<!-- Action items for table -->
						<template #item-actions="book">
							<div class="flex space-x-4 text-gray-500">
								<button @click="bookModal.openModal(book)">
									<Icon size="18" name="fluent:pen-24-regular" />
								</button>
								<button @click="removeBook(book)">
									<Icon size="18" name="fluent:delete-24-regular" />
								</button>
							</div>
						</template>
					</EasyDataTable>
				</ClientOnly>
			</div>
		</main>
		<!-- Book modal comp -->
		<BookModal ref="bookModal" />
	</div>
</template>

<script setup lang="ts">
	import { Header } from "vue3-easy-data-table";
	import dayjs from "dayjs";

	// Book store from pinia
	const bookStore = useBookStore();
	// Get books with async data
	await useAsyncData(() => bookStore.getAll(), {
		initialCache: false,
	});

	// Modal refence - used to open modal
	const bookModal = ref();
	//Search for record in table
	const search = ref("");

	// headers for the table
	const headers: Header[] = [
		{ text: "Title", value: "title", sortable: true, width: 200 },
		{ text: "Published", value: "published", width: 150 },
		{ text: "ISBN", value: "isbn", sortable: true },
		{ text: "Page Count", value: "pageCount", sortable: true, width: 200 },
		{ text: "Actions", value: "actions", width: 100 },
	];

	// Method used to remove a book
	const removeBook = async (book) => {
		await bookStore.remove(book._id);
	};
</script>
