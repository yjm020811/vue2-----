<template>
  <div>
    <button @click="useTimeout">点击</button>
    <svg-icon icon-class="person" size="32" />
    <svg-icon icon-class="box" size="32" />
    <Add ref="children"></Add>
    <Delete></Delete>
    <button @click="btnClick">父组件调用子组件中的方法</button>
    <Echarts></Echarts>
    <mixin></mixin>
    <echartsDemo></echartsDemo>
    <myMap></myMap>
    <transitionDemo />
    <router-view :key="key"></router-view>
    <propsDemo name="zhangsan" :age="18"></propsDemo>
  </div>
</template>

<script>
import Add from "./components/Add";
import Delete from "./components/Delete";
import Echarts from "./components/Echarts";
import echartsDemo from "./components/echartsDemo";
import mixin from "./components/mixin";
//数据大屏的适配
// import resize from "./mixin/resize";
import myMap from "./components/myMap.vue";
import svgIcon from "./components/svgIcon.vue";
import transitionDemo from "./components/transitionDemo.vue";
import propsDemo from './components/propsDemo.vue';

export default {
  // mixins: [resize],
  data() {
    return {
      msg: "yjm",
      bol: true
    };
  },
  components: {
    Add,
    Delete,
    Echarts,
    mixin,
    echartsDemo,
    myMap,
    transitionDemo,
    svgIcon,
    propsDemo
  },
  mounted() {
    console.log(this.$refs);
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
  methods: {
    btnClick() {
      this.$refs.children.add1();
    },
    useTimeout() {
      // setTimeout(() => {
      //   console.log(this.msg)
      // }, 1000);
      var that = this;
      setTimeout(function () {
        console.log(that.msg);
      }, 1000);
    }
  }
};
</script>

<style scoped></style>
