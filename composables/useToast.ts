import { useToast as toasty } from "vue-toastification";

export default function () {
	const toast = toasty();
	// export toast function
	return toast;
}
