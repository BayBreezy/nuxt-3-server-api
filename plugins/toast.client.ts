import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((app) => {
    app.vueApp.use(Toast);
});
