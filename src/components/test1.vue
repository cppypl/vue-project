<template>
    <div>
        <h3>统计vuex的总数:{{$store.getters.allCount}}</h3>
        <h3>应付价格:{{$store.getters.allPrice}}</h3>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                num: this.$store.state.num
            }
        },
        computed:{
           
        }
    }
</script>
<style scoped>
h3{color: red}
</style>

