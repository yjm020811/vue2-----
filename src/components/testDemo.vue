<template>
  <div>
    <button @click="getData">emit事件test</button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    getData() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { name: "张三", age: 18 },
            { name: "李四", age: 19 },
            { name: "王五", age: 20 }
          ]);
        }, 3000);
      }).then((res) => {
        console.log(res);
        this.$emit("refresh", "子组件获取数据完毕");
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
