<template>
  <div class="todolist">
        <div class="head">
            <input type="text" placeholder="输入接下来要完成的事" @keyup.enter="addList" v-model="addValue">
        </div>
        <div class="contentBox">
            <ul>
                <li v-for="item,index in filterList"   :class="{completed:item.completed,editing:item===editValue}">
                    <div class="view">
                        <input type="checkbox" class="toggle"  v-model="item.completed">
                        <label @dblclick="editTitle(item)">{{item.title}}</label>
                        <span class="destroy" @click="deleteThis(item,index)">x</span>
                        </div>
                    <input type="text" class="edit" v-model="item.title" @keyup.enter="save" @blur="save">
                </li>
            </ul>
        </div>

        <div class="tool" v-show="todoData.length!=0">
            <span class="todo-count">{{activeLength}}个待处理</span>
            <span class="filters">
                <a @click="now='all'" href="javascript:" :class="{selected:now=='all'}"  >全部</a>
                <a @click="now='active'"  href="javascript:" :class="{selected:now=='active'}"    >待完成</a>
                <a @click="now='completed'"  href="javascript:" :class="{selected:now=='completed'}"  >已完成</a>
            </span>
            <span class="clear-completed" @click="clearCompleted" v-show="hasCompleted">清空已完成项</span>
        </div>

    </div>
</template>

<script>
//设置localStorage
var store = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  fetch(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
};

let todoData = store.fetch("todoList");
let todoVm='';
export default {
  name: "todolist",
  data() {
    return {
      todoData,
      addValue: "",
      now: "all",
      editValue: ""
    };
  },

  watch: {
    todoData: {
      handler(newName, oldName) {
        store.save("todoList", this.todoData);
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      deep: true
    }
  },
  methods: {
    /*添加一项*/
    addList() {
      if (this.addValue != "") {
        this.todoData.push({
          title: this.addValue,
          completed: false
        });
        this.addValue = "";
      }
    },

    //清空所有已完成
    clearCompleted() {
      this.todoData = this.todoData.filter(function(item, index) {
        if (!item.completed) {
          return item;
        }
      });
    },
    //删除本项
    deleteThis(name, index) {
      this.todoData.splice(index, 1);
    },

    editTitle(item) {
      this.editValue = item;
    },
    save() {
      this.editValue = "";
    }
  },
  computed: {
    //计算待处理数
    activeLength() {
      return this.todoData.filter(function(item) {
        return !item.completed;
      }).length;
    },
    //是否显示清空所有已完成按钮
    hasCompleted() {
      return this.todoData.filter(function(item) {
        return item.completed;
      }).length;
    },
    //根据HASH来计算数据
    filterList() {
      var list = this.todoData;
      var filter = {
        all: function(list) {
          return list;
        },
        active: function(list) {
          return list.filter(function(item) {
            return !item.completed;
          });
        },
        completed: function(list) {
          return list.filter(function(item) {
            return item.completed;
          });
        }
      };
      return filter[this.now](this.todoData);
    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  background: #eee;
}
#app {
  width: 800px;
  margin: 50px auto;
  background: #fff;
}
.head {
  height: 70px;
  border-bottom: 1px #ddd solid;
}
.head input {
  height: 70px;
  line-height: 70px;
  color: #999;
  font-size: 24px;
  border: none;
  width: 100%;
  padding-left: 60px;
  box-sizing: border-box;
}
.contentBox {
  border-bottom: 1px #ddd solid;
  background: #fff;
}
.contentBox li {
  width: 100%;
  border-bottom: 1px #ddd solid;
  position: relative;
  font-size: 24px;
  list-style: none;
}
.contentBox li input.toggle {
  height: 60px;
  width: 50px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.contentBox li label {
  padding: 15px 15px 15px 60px;
  display: block;
}
.contentBox li .toggle + label {
  background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);
  background-repeat: no-repeat;
  background-position: center left;
  text-align: left;
}
.contentBox li .toggle:checked + label {
  background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E);
}
.contentBox li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
.tool {
  color: #777;
  background: #fff;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  position: relative;
}
.tool:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
.todo-count {
  float: left;
}
.filters {
  position: absolute;
  right: 0;
  left: 0;
}
.clear-completed {
  float: right;
  position: relative;
  line-height: 20px;
  cursor: pointer;
}
.filters a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
.filters a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.contentBox li .destroy {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  cursor: pointer;
}
.contentBox li:hover .destroy {
  display: block;
}

.edit {
  display: none;
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}
.editing .edit {
  display: block;
  margin-left: 43px;
  width: 757px;
  padding: 12px 16px;
}
.editing .view {
  display: none;
}
.todolist {
  padding: 50px 200px;
  max-width: 800px;
  margin: 0 auto;
  background: #999;
}
</style>