import { defineRule } from "vee-validate";
import { required, min, min_value, max, max_value } from "@vee-validate/rules";

export default defineNuxtPlugin(() => {
	defineRule("required", required);
	defineRule("min", min);
	defineRule("min_value", min_value);
	defineRule("max", max);
	defineRule("max_value", max_value);
});
