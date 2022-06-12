<template>
    <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"></MyHeader>  <!-- MyHeader.vue -->
        <MyList :todos="list" ></MyList>  <!-- MyList.vue -->
        <MyFooter :list="list"  @clearTodo="clearTodo"></MyFooter> <!-- Myfooter.vue -->
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
import MyHeader from './components/MyHeader.vue';
import MyFooter from './components/MyFooter.vue';
import MyList from './components/MyList.vue';

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter
},data:function(){    /* 将下一级组件所需数据都放到父组件，子组件之间就可以不用直接通信，直接和父组件沟通即可 */
    return {
      list:/* [
        {
          id:"1",
          title:"吃饭",
          completed:false
        },
        {
          id:"2",
          title:"睡觉",
          completed:true
        },
        {
          id:"3",
          title:"打豆豆",
          completed:false
        }
      ] */
      JSON.parse(localStorage.getItem("list")) || []
    }
  },
  mounted() {
    this.$bus.$on("checkTodo",this.checkTodo);
    let pubId = pubsub.subscribe("deleteTodo",this.deleteTodo);
    this.$bus.$on("updateTodo",this.updateTodo);
    this.$bus.$on("checkAll",this.checkAll)
    console.log(this);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo",this.checkTodo);
    pubsub.unsubscribe(pubId);
    this.$bus.$off("updateTodo",this.updateTodo);
  },
  methods: {
    addTodo(data){
      this.list.unshift(data);
    },
    checkTodo(id){
      this.list.forEach(item=>{
        if(item.id===id){
          item.completed=!item.completed;
        }
      })
    },
    deleteTodo(_,id){    /* 删除按钮 */
     this.list= this.list.filter(item=>item.id!==id);
    },
    checkAll(isAll){                 /* 全选按钮 */
      this.list.forEach(item=>{
        item.completed=isAll;
      })
    },
    clearTodo(newList){
      this.list = newList;
    },
    updateTodo(id,val){
      this.list.forEach(item=>{
        if(item.id===id){
          item.title=val;
        }
      })
    }
  },
  watch:{
    list:{
        deep:true,
        handler(val){
          localStorage.setItem("list",JSON.stringify(val));
        }
    }
  }
}
</script>

<style>
  /*base*/
 @import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@300;700;900&display=swap");

body {
  font-family: "Exo 2", sans-serif;
  background: rgb(63, 161, 251);
  background: linear-gradient(
    142deg,
    rgba(63, 161, 251, 1) 0%,
    rgba(252, 70, 168, 1) 100%
  );
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
  height: 100%;
}
  
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
input {
 outline: none;
}
  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }
  .btn-edit {
    margin-right: 5px;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
