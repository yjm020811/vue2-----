import _ from "lodash";

const useScalePage = {
  mounted() {
    this.triggerScale(); // 动画缩放网页
    this.$nextTick(() => {
      window.addEventListener("resize", this.resizeFunc);
    });
  },
  methods: {
    triggerScale() {
      // 1.设计稿的尺寸
      let targetX = this.option.targetX || 1920;
      let targetY = this.option.targetY || 1080;
      let targetRatio = this.option.targetRatio || 16 / 9; // 宽高比率

      // 2.拿到当前设备(浏览器)的宽度
      let currentX =
        document.documentElement.clientWidth || document.body.clientWidth;
      let currentY =
        document.documentElement.clientHeight || document.body.clientHeight;

      // 3.计算缩放比例
      let scaleRatio = currentX / targetX; // 参照宽度进行缩放 ( 默认情况 )
      let currentRatio = currentX / currentY; // 宽高比率

      // 超宽屏
      if (currentRatio > targetRatio) {
        // 4.开始缩放网页
        scaleRatio = currentY / targetY; // 参照高度进行缩放
        document.body.style = `width:${targetX}px; height:${targetY}px;transform: scale(${scaleRatio}) translateX(-50%); left: 50%`;
      } else {
        // 4.开始缩放网页
        document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio})`;
      }
    },
    resizeFunc: _.throttle(function () {
      this.triggerScale(); // 动画缩放网页
    }, 100)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFunc); // 释放
  }
};

export default {
  data() {
    return {
      option: {} // 你的选项对象应该放在这里
    };
  },
  mixins: [useScalePage]
};
