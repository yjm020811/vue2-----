import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // 保存的具体数据
  state: {
    count: 0,
    banner: []
  },
  //修改state中的数据
  mutations: {
    //mutations中的函数传递的参数是state中的值
    add(state) {
      state.count++;
      console.log(state);
    },
    addN(state, value) {
      state.count += value;
    },
    delete(state) {
      state.count -= 1;
    },
    changeBanners(state, banners) {
      console.log(state);
      console.log(banners);
      state.banner = banners;
    }
  },
  //响应组件中的用户动作
  actions: {
    addAsync(context, value) {
      setTimeout(() => {
        //通过commit触发mutations中的函数，实线异步操作
        //context表示为上下文,value是组件中传递过来的数据
        context.commit("addN", value);
        console.log(context);
        console.log(value);
      }, 1000);
    },
    getData(context) {
      axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
        console.log(res);
        context.commit("changeBanners", res.data.data.banner.list);
      });
    }
  },
  getters: {
    showNum(state) {
      return "当前最新的数量是【" + state.count + "】";
    }
  }
});
