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
    <span>动态编辑图表：</span>
    <el-select v-model="value" placeholder="请选择" @change="changeType(value)">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
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
      loading: true,
      // 设置默认type
      chartType: "bar",
      options: [
        {
          value: "pie",
          label: "饼图"
        },
        {
          value: "line",
          label: "折线图"
        },
        {
          value: "bar",
          label: "柱状图"
        }
      ],
      value: ""
    };
  },
  computed: {
    // 动态设置type
    dynamicType() {
      return this.chartType === "bar" ? "bar" : "line";
    }
  },
  watch: {
    // 监听type的变化
    dynamicType(newVal) {
      this.chartOption.series[0].type = newVal;
    }
  },
  created() {
    console.log("切换了");
    this.getxAxisData();
    // 设置默认值
    this.value = this.chartType;
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
    },
    changeType(value) {
      if (value == "pie") {
        this.chartOption = {
          xAxis: {},
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: "50%",
              data: [
                { value: 1048, name: "大桥1" },
                { value: 735, name: "大桥2" },
                { value: 580, name: "大桥3" },
                { value: 484, name: "大桥4 " },
                { value: 300, name: "大桥5" }
              ]
            }
          ]
        };
      } else {
        this.chartType = value;
        this.chartOption = {
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
        };
      }
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
