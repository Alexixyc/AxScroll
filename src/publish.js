import AxScroll from './AxScroll.vue';

const install = Vue => {
  Vue.component(AxScroll.name, AxScroll);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  AxScroll,
}
