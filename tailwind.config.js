const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter"],
			},
			colors: {
				primary: {
					DEFAULT: colors.orange[500],
					...colors.orange,
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
