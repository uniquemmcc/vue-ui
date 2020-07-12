<template>
    <div class="dialog_view">

        <p>函数式调用多个，可拖拽可放大缩小，可自定义加载内容</p>
        <button @click="handleClick">dialog</button>

        

   
    </div>
</template>
<script>
import Dialog from '_c/Dialog/Dialog.vue'
export default {
    components: {
        Dialog
    },
    data(){
        return{

            objs: {}
        }
    },
    methods: {
        handleClick(){
            
            let jsxObj = null
            let value = ''
            let instance =this.$showDialog({title:'title'})
            let id = instance.id
            this.objs[id] = { instance,jsxObj,value}

            jsxObj = ( <div> 
                <p>content</p>
                <input value={this.objs[id].value} on-input={this.handleInput.bind(this,id)}></input>
                 <span>{this.objs[id].value} </span>
                </div> )
            this.objs[id].jsxObj = jsxObj
            this.objs[id].instance.setJsx(this.objs[id].jsxObj)
            
            
            
            
 
        },
        add(){
            
        },
        
        handleInput(id,e){
          


            let value = e.target.value
            this.objs[id].value= value
            let  jsxObj = ( <div> 
                <p>content</p>
                <input value={this.objs[id].value} on-input={this.handleInput.bind(this,id)}></input>
                 <span>{this.objs[id].value} </span>
                </div> )
            this.objs[id].jsxObj = jsxObj
            this.objs[id].instance.setJsx(this.objs[id].jsxObj)


        }
    }
}
</script>
<style>
.dialog_view{
 
}
</style>