<template>
  <div id="app">

    <Test></Test>

  </div>
</template>

<script>
import Test from "./components/Test.vue";
// import Test1 from "./components/test1.vue";


export default {
  name: "App",
  data() {
    return {
      
    };
  },
  components: {
    Test,
    //Test1
  },
  
  methods: {
    
  }
};
</script>

<style>
*{margin: 0 ; padding: 0}
body{background: #eee}
.orange{color:#f60}
.left{float: left;}
.right{float: right;}
</style>
