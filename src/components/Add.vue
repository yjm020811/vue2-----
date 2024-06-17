<template>
  <div>
    <div>
      <!-- 使用mapstate简化操作 -->
      <h2>{{ showNum }}</h2>
      <h3>{{ count }}</h3>
      <button @click="test">通过封装的接口来获取数据</button>
      <button @click="add1(1)">加一</button>
      <button @click="add2(2)">加2</button>
      <button @click="shanchu">减一</button>
      <button @click="add3(5)">延时加5</button>
      <button @click="getData">点击获取数据</button>
      <button @click="test">点击测试node接口</button>

      <div>
        <label v-for="(item, index) in items" :key="index">
          <input type="checkbox" v-model="checkedItems[index]" @change="handleCheckboxChange(index)" />
          {{ item }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { getClothes } from '../api/index';

export default {
  name: "MyAdd",

  data() {
    return {
      person: {
        name: "yjm",
        age: 20,
      },
      dataList: [],
      items: ['Item 1', 'Item 2', 'Item 3'], // 你的数据
      checkedItems: [] // 用于存储每个 checkbox 的状态
    };
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  methods: {
    //普通的方式
    // add1() {
    //   this.$store.commit("add");
    // },
    //简写的方式 在简写方式中,对象的属性是组件中的方法,对象的value是store中的方法
    ...mapMutations({ add1: "add" }),

    // add2() {
    //   this.$store.commit("addN", 3);
    // },
    ...mapMutations({ add2: "addN" }),

    // add3() {
    //   this.$store.dispatch("addAsync", 5);
    // },
    ...mapActions({ add3: "addAsync" }),

    // shanchu(){
    //   this.$store.dispatch("delete")
    // }
    ...mapMutations({ shanchu: "delete" }),

    // getData() {
    //   this.$store.dispatch("getData");
    // },
    ...mapActions({ getData: "getData" }),

    // 测试接口
    async test() {
      const res = await getClothes();
      console.log(res);
      this.dataList = Object.values(res.data)
      console.log(this.dataList);
    },
    handleCheckboxChange(index) {
      console.log(`点击了index为${index}的checkbox`);
    }
  },
}
</script>

<style></style>