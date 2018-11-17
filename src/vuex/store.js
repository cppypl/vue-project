import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex);

let store=new Vuex.Store({
    state:{
        num:111,
        shopList:[
            {
                id:11234,
                num:1,
                title:'小米6',
                price:1999,
                isChecked:true
            },
            {
                id:22343,
                num:2,
                title:'小米mix2',
                price:3299,
                isChecked:true
            },
            {
                id:3124,
                num:3,
                title:'笔记本电脑',
                price:6499,
                isChecked:true
            }
        ]
    },
    getters:{
        allCount(state){
            return state.shopList.reduce((start,item)=>{
                return start+item.num
            },0)
        },
        allPrice(state){
            let price=0;
            state.shopList.forEach((item)=>{
                price+=item.num*item.price
            })
            return price
            
        }
    },
    mutations:{
        updateNum(state,id){
            let item=state.shopList.find(item=>{
                return item.id==id
            });
            item.num+=1;
        },
        lowerNum(state,id){
            let item=state.shopList.find(item=>{
                return item.id==id
            });
            if(item.num > 1){
                item.num-=1
            } 
        },
        // allCheck(state,status){
            
        //     state.shopList.forEach(item => {
        //         item.isChecked=status
        //      })
        //      console.log(state.shopList);
        // }
    }
})
export default  store