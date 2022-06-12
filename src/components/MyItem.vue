<template>
      <transition name="todo" appear>
         <li>
            <label>
              <!-- <input type="checkbox" :checked="todo.completed" @change="handle(todo.id)"/> -->
               <el-checkbox :value="todo.completed" @change="handle(todo.id)"></el-checkbox>
              <span v-show="!todo.isEdit">{{todo.title}}</span>
              <input type="text" :value="todo.title" v-show="todo.isEdit" @blur="handleBlur(todo,$event)" ref="edit">
            </label>
<!--        <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
            <button class="btn btn-edit" @click="handleEdit(todo)" v-show="!todo.isEdit">编辑</button> -->
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="handleDelete(todo.id)" class="btn-edit">删除</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(todo)" v-show="!todo.isEdit" class="btn-edit">编辑</el-button>
          </li>
      </transition>
</template>

<script>
import pubsub from "pubsub-js";
export default {
    name:"MyItem",
    props:['todo'],
    methods: {
        handle(id){
            this.$bus.$emit("checkTodo",id);
        },
        handleDelete(id){
             if(confirm("确定删除吗？")){
                pubsub.publish("deleteTodo",id);
             }
        },
         handleEdit(todo){
            if("isEdit" in todo){
                todo.isEdit=true;
              }else{
                this.$set(todo,"isEdit",true);
              }
              /* this.$refs.edit.focus(); */ /* 直接在此处focus不管用，注意Vue生命周期，Vue事先进行数据代理，再解析模板，也就是说在调用focus时,input框还没挂载 */
              this.$nextTick(function(){
                this.$refs.edit.focus();
              });
       },
       handleBlur(todo,event){
            todo.isEdit = false;         /* blur与focus是一对事件，因此此处只有先获取焦点才能blur */
            this.$bus.$emit("updateTodo",todo.id,event.target.value);
       }
    },
}
</script>

<style scoped>
     li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
    transition: all 0.5s linear;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background-color: #eee;
  }
  li:hover button{
    display: block;
  }
  .todo-enter,.todo-leave-to{
     transform: translate(100%);
  }
  .todo-leave-active,.todo-enter-active{
     transition: all 0.5s linear;
  }
  .todo-enter-to,.todo-leave{
     transform: translate(0);
  }
</style>