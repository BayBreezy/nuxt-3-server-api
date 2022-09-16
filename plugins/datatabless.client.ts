import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

export default defineNuxtPlugin((app) => {
	app.vueApp.component("EasyDataTable", Vue3EasyDataTable);
});
