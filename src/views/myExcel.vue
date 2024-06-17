<template>
  <div
    id="luckysheet"
    style="
      margin: 0px;
      padding: 0px;
      position: absolute;
      width: 100%;
      height: 300px;
      left: 0px;
      top: 50px;
    "
  ></div>
</template>

<script>
// 使用方式：https://blog.csdn.net/weixin_39246975/article/details/121697306
export default {
  props: {},
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var options = {
        container: "luckysheet", //luckysheet为容器id
        title: "luckysheet", //表头名
        lang: "zh" //中文
      };

      // eslint-disable-next-line no-undef
      luckysheet.create(options);
    }
  }
};
</script>
<style scoped></style>
