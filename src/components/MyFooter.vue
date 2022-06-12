<template>
  <div class="todo-footer" v-show="total">
          <label>
            <!-- <input type="checkbox" :checked="isAll" @change="checkTodo"/> -->
            <!-- <input type="checkbox"  v-model="isAll"/> -->
             <el-checkbox v-model="isAll"  ref="all"></el-checkbox>
            </label>
          <span>
            <span>已完成{{doneTotal}}</span> / 全部{{total}}
          </span>
         <!-- <button class="btn btn-danger" @click="clear">清除已完成任务</button> -->
          <el-button type="danger" round @click.native="clear">清除已完成任务</el-button>
        </div>
</template>

<script>
export default {
    name:"MyFooter",
    props:['list'],
    computed:{
        total(){
            return this.list.length;
        },
        doneTotal(){
            return this.list.filter(item=>item.completed).length;
        },
        isAll:{
          get(){
           return this.total === this.doneTotal;
           },
           set(val){
               this.$bus.$emit("checkAll",val)
           }
        }
    },
    methods: {
        /* checkTodo(e){
           this.$bus.$emit("checkAll",this.$refs.all.isChecked)
        }, */
        clear(){
          this.$emit("clearTodo",this.list.filter((item)=>{
            return !item.completed
          })
        )}
    },
}
</script>

<style scoped>
    .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>