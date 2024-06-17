<template>

  <div>
    <!-- 调用组件自身的greet函数 -->
    <button @click="greet">Greet</button>
    <!-- 显示组件自身的message -->
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { mixins } from "../mixin/index";

export default {
  mixins: [mixins],
  name: "MyMixin",
  data() {
    return {
      message: "Hello from component"
    };
  },
  created() {
    console.log('Component created');
  },
  methods: {
    greet() {
      console.log('Component says: ' + this.message);
    }
  }
};
</script>
<style scoped></style>
