import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import Store from "electron-store";

const store = new Store();

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: store.get("darkTheme") },
});
