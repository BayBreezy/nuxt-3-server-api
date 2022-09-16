<template>
	<div class="min-h-screen">
		<main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
			<!-- Page title -->
			<h1 class="text-2xl font-medium">Authors</h1>
			<p class="mt-2 text-sm text-gray-500">Manage your authors here</p>

			<div
				class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row"
			>
				<div class="relative w-full md:mr-10 grow">
					<span class="absolute -translate-y-1/2 top-1/2 left-3">
						<Icon name="ep:search" size="24" class="text-gray-400" />
					</span>
					<input
						placeholder="Search author..."
						v-model="search"
						type="search"
						name="search"
						id="search"
						class="pl-11 input"
					/>
				</div>
				<button
					@click="authorModal.openModal()"
					class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0"
				>
					Add Author
				</button>
			</div>

			<div class="relative mt-5 border border-gray-100 rounded-lg">
				<ClientOnly>
					<EasyDataTable
						empty-message="No Author Found"
						:search-value="search"
						theme-color="#f97316"
						table-class-name="eztble"
						:headers="headers"
						:items="authorStore.authors"
					>
						<!-- Show authors  -->
						<template #item-name="{ name }">
							<span class="font-semibold">{{ name }}</span>
						</template>
						<!-- Action items for table -->
						<template #item-actions="author">
							<div class="flex space-x-4 text-gray-500">
								<button @click="authorModal.openModal(author)">
									<Icon size="18" name="fluent:pen-24-regular" />
								</button>
								<button @click="removeAuthor(author)">
									<Icon size="18" name="fluent:delete-24-regular" />
								</button>
							</div>
						</template>
					</EasyDataTable>
				</ClientOnly>
			</div>
		</main>
		<!-- Author modal comp -->
		<AuthorModal ref="authorModal" />
	</div>
</template>

<script setup lang="ts">
	import { Header } from "vue3-easy-data-table";

	// Author store
	const authorStore = useAuthorStore();

	// get data on page load
	useAsyncData(async () => await authorStore.getAll(), {
		initialCache: false,
	});

	// Modal ref
	const authorModal = ref();
	//Search for author in table
	const search = ref("");

	// Method used to remove an author
	const removeAuthor = async (author) => {
		await authorStore.remove(author._id);
	};

	// Table headers
	const headers: Header[] = [
		{ text: "Author Name", value: "name", sortable: true },
		{ text: "Actions", value: "actions", width: 100 },
	];
</script>
