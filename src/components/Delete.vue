<template>
  <div>
    <h3>当前最新的count值为:{{ $store.state.count }}</h3>
    <button @click="delete1">减一</button>

  </div>
</template>
  
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'MyDelete',
  data() {
    return {

    }
  },
  methods: {
    //  delete1(){
    //   this.$store.commit('delete')
    //  }
    ...mapMutations({ delete1: "delete" })
  }
}
</script>
  
<style></style>