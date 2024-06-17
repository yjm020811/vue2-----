<template>
  <div>
    <button @click="bol = !bol">隐藏/显示</button>
    <!-- Vue 的内置动画标签 transition -->
    <transition name="hello">
      <!-- 只能包含 1 个元素 -->
      <h1 v-show="bol">组件动画效果</h1>
      <!-- 需要设置 v-show / v-if 属性控制元素的显示 -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { bol: true };
  },
};
</script>

<style scoped>
/* 进入动画 */
.hello-enter-active {
  animation: move 1s;
}

/* 离开动画 */
.hello-leave-active {
  animation: move 1s reverse;
}

@keyframes move {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translate(0);
  }
}
</style>
