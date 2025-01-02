import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./routes";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "auth-token"
)}`;

const app = createApp(App);

app.use(router);
app.mount("#app");
