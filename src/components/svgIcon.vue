<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
    :style="svgStyle"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// 导入公共方法，校验传入的 iconClass 是否为外部链接
// 匹配 http 或者 https
import { isExternal } from "@/utils/validate";

export default {
  name: "SvgIcon",
  // icon图标
  props: {
    iconClass: {
      type: String,
      required: true
    },
    // 图标类名
    className: {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number], // 接受字符串或数字
      default: 16 // 默认单位改为 16
    }
  },
  computed: {
    // 判断传入的 iconClass 是否为外部链接
    isExternal() {
      return isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : "svg-icon";
    },
    svgStyle() {
      const size = typeof this.size === "number" ? `${this.size}px` : this.size;
      return {
        width: size,
        height: size
      };
    },
    // 外部图标样式
    styleExternalIcon() {
      const size = typeof this.size === "number" ? `${this.size}px` : this.size;
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`,
        backgroundColor: "currentColor",
        width: size,
        height: size
      };
    }
  }
};
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
