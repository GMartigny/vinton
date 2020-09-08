import Vue from "vue/dist/vue.esm";

import Vuetify from "vuetify/dist/vuetify.min";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.min.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
    },
});
