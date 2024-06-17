<template>
  <div class="chart">
    <div ref="chart" :style="{ height: height, width: width }" />
  </div>
</template>
<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  SVGRenderer
]);

export default {
  name: "ChartView",
  // 组件的props
  props: {
    // 宽度
    width: {
      type: String,
      default: "100%"
    },
    // 高度
    height: {
      type: String,
      default: "350px"
    },
    // 是否自动调整
    autoResize: {
      type: Boolean,
      default: true
    },
    // 图表配置项
    chartOption: {
      type: Object,
      required: true
    },
    // 渲染类型
    type: {
      type: String,
      default: "svg"
    }
  },
  // 组件的数据
  data() {
    return {
      chart: null
    };
  },
  // 监听图表配置项
  watch: {
    chartOption: {
      deep: true,
      handler(newVal) {
        this.setOptions(newVal);
      }
    }
  },
  // 组件挂载完成后
  mounted() {
    this.initChart();
    if (this.autoResize) {
      window.addEventListener("resize", this.resizeHandler);
    }
  },
  // 组件销毁前
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.resizeHandler);
    }
    this.chart.dispose();
    this.chart = null;
  },
  // 组件方法
  methods: {
    // 调整图表大小
    resizeHandler() {
      this.chart.resize();
    },
    // 初始化图表
    initChart() {
      this.chart = echarts.init(this.$refs.chart, "", {
        renderer: this.type
      });
      this.chart.setOption(this.chartOption);
      this.chart.on("click", this.handleClick);
    },
    // 点击事件
    handleClick(params) {
      this.$emit("click", params);
    },
    // 设置图表配置项
    setOptions(option) {
      this.clearChart();
      this.resizeHandler();
      if (this.chart) {
        this.chart.setOption(option);
      }
    },
    // 刷新图表
    refresh() {
      this.setOptions(this.chartOption);
    },
    // 清除图表
    clearChart() {
      this.chart && this.chart.clear();
    }
  }
};
</script>
