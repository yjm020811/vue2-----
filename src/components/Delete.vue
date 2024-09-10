<template>
  <div>
    <h3>当前最新的count值为:{{ $store.state.count }}</h3>
    <button @click="delete1">减一</button>
    <testDemo @refresh="onRefresh" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import testDemo from "./testDemo.vue";
export default {
  name: "MyDelete",
  components: {
    testDemo
  },
  data() {
    return {};
  },
  methods: {
    //  delete1(){
    //   this.$store.commit('delete')
    //  }
    ...mapMutations({ delete1: "delete" }),
    onRefresh(e) {
      console.log("刷新了", e);
    }
  }
};
</script>

<style></style>
