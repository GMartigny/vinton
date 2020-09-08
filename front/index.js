import Vue from "vue/dist/vue.esm";
import vuetify from "./vuetify";
import App from "./App.vue";

const wrapper = document.createElement("div");
document.body.appendChild(wrapper);

const app = new Vue({
    vuetify,
    template: "<App></App>",
    components: {
        App,
    },
});
app.$mount(wrapper);
