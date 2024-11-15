import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router'
import { createPinia } from "pinia";
import { createPiniaMiddleware } from "./plugins/piniaMiddleware";
import piniaPersistedstate from "pinia-plugin-persistedstate";
import './assets/styles/global.css';


const pinia = createPinia();
pinia.use(createPiniaMiddleware());
pinia.use(piniaPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
