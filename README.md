<!--
 * @Author: Alexixyc
 * @Date: 2019-07-29 11:24:20
 * @LastEditors: Alexixyc
 * @LastEditTime: 2019-08-13 11:45:02
 * @Description: file description
 -->

## AxScroll
基于Vue开发的下拉刷新组件

[![Github](https://img.shields.io/badge/GitHub-Follow-brightgreen.svg?longCache=true&style=popout-square)](https://github.com/Alexixyc/AlexiComponents)

[![Blog](https://img.shields.io/badge/Blog-AlexiXiang-brightgreen.svg?longCache=true&style=popout-square)](http://alexixyc.cn)


### Get Started
```js
    npm install ax-scroll -S
```

> - main.js:
> ```js
>   import Vue from 'vue'
>   import App from './App.vue'
>   import AxScroll from 'ax-scroll';
> 
>  Vue.use(AxScroll);
> 
>   new Vue({
>     el: '#app',
>     render: h => h(App)
>   })
> ```

> - demo.vue
> ```html
>   <ax-scroll @onPullDown="onMockRequset">
>     <div v-for="item in 20" :key="item" class="list-item">
>       卡片{{ item }}
>     </div>
>   </ax-scroll>
> 
>   <script>
> 
>   export default {
>     name: 'app',
> 
>     methods: {
>      onMockRequset({ end }) {
>         setTimeout(() => {
>          end(); // 异步刷新结束后，手动执行停止loading的回调方法
>         }, 1500);
>       },
>     },
>   }
>   </script>
> 
>  <style>
>   body, html {
>     margin: 0;
>     padding: 0;
>     height: 100%;
>   }
>  </style>
> ```