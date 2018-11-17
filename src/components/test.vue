<template>
  <div class="shoppingCart">

    <h3>我的购物车</h3>

    <table width="100%">
      <thead>
        <tr>
          <td><label><input type="checkbox" v-model="allCheck"  @click="allCheckHandle">全选</label></td>
          <td width='200'>商品名称</td>
          <td>单价</td>
          <td>数量</td>
          <td>小计</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in datalist">
          <td><input type="checkbox"  v-model="item.isChecked" @click="isAllCkecked"></td>
          <td>{{item.title}}</td>
          <td>{{item.price}}</td>
          <td>
              <button @click="add(item.id)">+</button>
              <span>{{item.num}}</span>
              <button @click="lower(item.id)">-</button>

          </td>
          <td class="orange">{{item.num*item.price}}</td>
          <td>
              <a href="javascript:" @click="del(index)">删除</a>
          </td>
        </tr>
      </tbody>
      
    </table>

    
    <div class="tongji">
      共 <b class="orange">{{$store.getters.allCount}}</b> 件商品，已选择 <b  class="orange">{{checkedCount}}</b> 件 
      <span class="right">合计：<b  class="orange">{{price}}</b>元 </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      

      datalist: this.$store.state.shopList,
      allCheck:true
    };
  },
  computed:{
   
   
    newdatalist(){
        return this.$store.state.shopList
    },
    checkedCount(){
      let newArr= this.datalist.filter(item=>item.isChecked==true) //找出已勾选的产品
      return newArr.reduce((total,num)=>{   //把已勾选的产品的num累加，return出去
          return total+num.num
      },0)
      
    },
    price(){
       let newArr= this.datalist.filter(item=>item.isChecked==true) //找出已勾选的产品
        return newArr.reduce((total,num)=>{   //把已勾选的产品的num累加，return出去
            return total+num.price*num.num
        },0)
    }
    
  },
  methods: {
    add(id) {
      this.$store.commit("updateNum", id);
    },
    lower(id) {
      this.$store.commit("lowerNum", id);
    },
    allCheckHandle(ev){
        this.datalist.forEach(item => {
            item.isChecked=ev.target.checked
        })
    },
    isAllCkecked(){
      this.$nextTick(()=>{
        let newState= this.datalist.every(item=>item.isChecked)
        this.allCheck=newState
      })
      
    },
    del(i){
        this.datalist.splice(i, 1);
    }


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoppingCart {
  width: 1000px;
  margin: 50px auto;
  background: #fff;
}
.shoppingCart h3{ padding: 20px;}
.shoppingCart tr td{border-bottom: 1px #ddd solid}
.shoppingCart td {
   padding: 20px;
}
.itemTitle {
  display: inline-block;
  width: 200px;
  text-align: left;
}
.tongji{ padding: 20px;}
</style>
