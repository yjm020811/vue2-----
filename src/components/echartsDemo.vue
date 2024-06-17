<template>
  <div>
    <MyChart
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :chartOption="chartOption"
      @click="itemClick"
    ></MyChart>
    <button @click="changeRouter">切换路由</button>
    <button @click="close">切换加载状态</button>
  </div>
</template>

<script>
import MyChart from "./com/MyChart.vue";
import { getClothes } from "../api/index.js";

export default {
  name: "echartsDemo",
  props: {},
  components: {
    MyChart
  },
  data() {
    return {
      chartOption: {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 100],
            type: "bar"
          }
        ]
      },
      chartData: [],
      loading: true
    };
  },
  created() {
    console.log("切换了");
  },
  mounted() {
    this.getxAxisData();
  },
  methods: {
    itemClick(params) {
      window.open(
        "https://www.baidu.com/s?wd=" + encodeURIComponent(params.name)
      );
    },
    async getxAxisData() {
      const res = await getClothes();
      console.log(res.data.keywords.list);
      this.chartData = res.data.keywords.list;
      this.chartOption.xAxis.data = this.chartData.map((item) => item.words);
      this.loading = false;
    },
    close() {
      this.loading = !this.loading;
    },
    changeRouter() {
      this.$router.push(
        this.$router.currentRoute.path === "/edit" ? "detail" : "edit"
      );
    }
  }
};
</script>
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  /* 设置合适的高度 */
  font-size: 1.2rem;
  /* 添加更多的样式，比如旋转动画等，来增强加载时的视觉效果 */
}
</style>
