<template>
	<header class="w-full border-b border-gray-200 bg-white/50 backdrop-blur">
		<div class="flex items-center justify-between h-20 px-3 mx-auto max-w-7xl">
			<NuxtLink to="/" class="text-xl font-semibold">CRUD</NuxtLink>
			<nav class="flex items-center space-x-2">
				<template v-for="n in menu" :key="`menuItem${n.name}`">
					<NuxtLink
						class="px-3 py-2 text-sm font-medium text-gray-500 transition-all rounded-lg link hover:text-primary hover:bg-primary-50"
						:to="n.link"
						>{{ n.name }}</NuxtLink
					>
				</template>
			</nav>
		</div>
	</header>
</template>

<script setup>
	const menu = ref([
		{ name: "Books", link: "/" },
		{ name: "Authors", link: "/authors" },
	]);
</script>

<style scoped>
	.router-link-active.link {
		@apply text-primary bg-primary-50;
	}
</style>
