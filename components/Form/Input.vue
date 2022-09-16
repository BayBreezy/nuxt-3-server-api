<template>
	<div class="w-full">
		<label v-if="label" class="label" :for="$attrs.id">{{ label }}</label>
		<input v-model="value" v-bind="$attrs" class="input" />
		<div class="mt-1 text-xs text-red-500">
			<span class="text-transparent">.</span>
			<span>
				{{ errorMessage }}
			</span>
		</div>
	</div>
</template>

<script setup>
	import { useField } from "vee-validate";
	const props = defineProps({
		label: String,
		name: String,
		rules: String,
		modelValue: [String, Number],
	});

	// Get value and errorMessage to use in template
	const { errorMessage, value } = useField(ref(props.name), props.rules, {
		initialValue: props.modelValue, // set init value
		label: props.label || props.name, // label used for displaying errors
	});
</script>

<script>
	// stop component from inheriting attrs
	export default {
		inheritAttrs: false,
	};
</script>

<style></style>
