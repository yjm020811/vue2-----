export const mixins = {
  data() {
    return {
      message: "Hello from Mixin!"
    };
  },
  computed: {},
  created() {
    console.log("Mixin created");
  },
  methods: {
    greet() {
      console.log("Mixin says: " + this.message);
    }
  }
};
