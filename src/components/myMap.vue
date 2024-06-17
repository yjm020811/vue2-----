<template>
  <div id="mapcharts" ref="map"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapData } from "./com/map.js";

export default {
  name: "myMap",
  props: {},

  data() {
    return {};
  },
  methods: {},

  mounted() {
    let chart = echarts.init(this.$refs.map);
    echarts.registerMap("sichuanMap", mapData);
    let option = {
      geo: {
        type: "map",
        map: "sichuanMap",
        roma: true,
        center: [107.464818, 31.215789],
        label: {
          show: true,
          color: "#ff0",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "skyblue",
        },
        tooltip:{
          show:true
        }
      },
      // 散点图
    };
    chart.setOption(option);
  },
};
</script>
<style scoped>
#mapcharts {
  height: 400px;
  width: 100%;
}
</style>
