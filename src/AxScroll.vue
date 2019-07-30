<template>
  <div
    :class="['wrap', `${isAllowScroll ? 'allow-scroll' : 'stop-scroll'}`]"
    ref="wrapContent"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div
      :class="['scroll-downwrap', {
        'downwrap-reset': !isTouching,
      }]"
      :style="{
        height: `${downWrapHeight}px`,
      }">
      <div class="downwrap-content">
        <div class="downwrap-content__default">
          <i
            :class="['default-icon', {
              'icon-animate': !isTouching,
            }]"
            :style="{
            transform: `rotate(${iconRotate}deg)`
          }"/>
          <span class="default-text">
            {{ downWrapText }}
          </span>
        </div>
      </div>
    </div>

    <div class="wrap-content">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ax-scroll',

  data() {
    return {
      maxHeight: 70,
      downWrapHeight: 0,
      startY: 0, // touchstart y
      isTouching: false, // 是否处于触摸中
      touchNum: 0,
      isAsync: false, // 处于异步刷新事件中
      isAllowScroll: true,
    };
  },

  computed: {
    iconRotate() {
      return parseInt(360 / this.maxHeight * this.downWrapHeight);
    },
    downWrapText() {
      if (this.isAsync) return '加载中...';
      if (this.downWrapHeight < this.maxHeight) return '下拉加载';
      return '释放刷新';
    },
  },

  methods: {
    onTouchStart(e) {
      if (this.isAsync) return;
      this.touchNum += 1;
      if (this.touchNum > 1) return;
      this.isTouching = true;
      this.startY = parseInt(e.targetTouches[0].clientY);
    },

    onTouchMove(e) {
      //  上一次异步未结束，禁止重复
      if (this.isAsync || !this.isTouching) {
        e.preventDefault();
        return;
      }
      // 禁止多个触摸点
      if (this.touchNum > 1) return;

      const wrapSrollTop = this.$refs.wrapContent.scrollTop;
      if (wrapSrollTop <= 0) {
        if (wrapSrollTop < 0) {
          this.isAllowScroll = false;
        }
        const currentY = parseInt(e.targetTouches[0].clientY);
        const distance = currentY - this.startY;
        if (distance <= 0) return;
        e.preventDefault();
        if (distance <= this.maxHeight) {
          this.downWrapHeight = distance;
        } else {
          this.downWrapHeight = parseInt(this.maxHeight + (distance - this.maxHeight) * 0.2);
        }
      }
    },

    onTouchEnd() {
      if (this.isAsync) return;
      this.touchNum -= 1;
      if (this.touchNum > 0) return;
      this.isTouching = false;
      this.isAllowScroll = true;
      if (this.downWrapHeight >= this.maxHeight) {
        this.downWrapHeight = this.maxHeight;
        this.isAsync = true;
        // 触发下拉异步刷新事件emit
        this.$emit('onPullDown', {
          end: this.onEnd,
        });
      } else {
        console.log('cancle');
        this.downWrapHeight = 0;
      }
    },

    onEnd() {
      this.isTouching = false;
      this.isAsync = false;
      this.downWrapHeight = 0;
      this.touchNum = 0;
      this.isAllowScroll = true;
    },

  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .scroll-downwrap {
    position: relative;
    overflow: hidden;
    .downwrap-content {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 50px;
      &__default {
        display: flex;
        justify-content: center;
        align-items: center;
        .default-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #999999;
          border-bottom-color: transparent;
        }
        .default-text {
          color: #999999;
          margin-left: 10px;
          line-height: 50px;
          font-size: 14px;
        }
      }
    }
  }
  .downwrap-reset {
    transition: height .3s;
  }
  .icon-animate {
    animation: rotate .8s linear infinite;
  }
  @keyframes rotate{
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
.stop-scroll {
  overflow-y: hidden;
}
.allow-scroll {
  overflow-y: scroll;
}
</style>
