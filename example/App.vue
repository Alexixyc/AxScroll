<template>
  <ax-scroll @onPullDown="onMockRequset">
    <div v-for="item in 20" :key="item" class="list-item">
      卡片片{{ item }}
    </div>
  </ax-scroll>
</template>

<script>

export default {
  name: 'app',

  methods: {
    onMockRequset({ end }) {
      setTimeout(() => {
        end();
      }, 1500);
    },
  },
}
</script>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.list-item {
  height: 100px;
  line-height: 100px;
  margin-bottom: 10px;
  background: rgba(241, 126, 126, 0.4);
}
</style>
