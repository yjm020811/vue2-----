<template>
    <div>
        我是props组件:{{ name }}---{{ age }}
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
        },
        age: {
            type: Number,
            default: 18
        },
    },
    data() {
        return {}
    },
    mounted() {
        console.log(this.name);
        // 直接通过this.props访问是undefined
        console.log(this.props); //undefined
        console.log(this.$props);// 这样才行
    }
}
</script>
<style scoped></style>