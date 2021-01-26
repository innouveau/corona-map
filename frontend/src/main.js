import Vue from 'vue';
import App from './app.vue';
import store from './store/store';
import router from './router';
import translateMixin from '@/mixins/translate';

Vue.mixin(translateMixin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: function (h) { return h(App) },
}).$mount('#app');
