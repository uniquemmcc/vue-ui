<template>
    <div class="dialog_view">

        <p style="margin-bottom:20px;">函数式调用多个，可拖拽可放大缩小</p>
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

            objs: {},

            // abc: { p:{}},
            // list: [{name:'lisi'}, {name: 'wangwu'}]
        }
    },
    methods: {
        handleClick(){
            
            // let jsxObj = null
            // let value = ''
            // let instance =this.$showDialog({title:'title'})
            // let id = instance.id
            // this.objs[id] = { instance,jsxObj,value}

            // jsxObj = ( <div> 
            //     <p>content</p>
            //     <input value={this.objs[id].value} on-input={this.handleInput.bind(this,id)}></input>
            //      <span>{this.objs[id].value} </span>
            //     </div> )
            // this.objs[id].jsxObj = jsxObj
            // this.objs[id].instance.setJsx(this.objs[id].jsxObj)
            let value = ''
            
            let instance =this.$showDialog({
                title:'title',
                width: 300,
                height: 300, 
                renderFuc:(h)=>{
                     return ( 
                        <div style="padding:10px;"> 
                            <p>content</p>
                            { this.objs[id]? <input value={this.objs[id].value} on-input={this.handleInput.bind(this,id)}></input> : '' }
                            { this.objs[id]? <span>{this.objs[id].value} </span> : 'not' }

                            
                         </div> 
                        )
                    }
                })
                
            let id = instance.id    
            // this.objs[id] = { instance,value}    
            let obj = { instance,value}    
            this.$set(this.objs, id, obj)
            
            
          /**
            //test  arr
            console.log(this.list.length)
            this.list[1]={name: 'zhangsan'}            
            //test  obj
            this.abc.p = {name: 'zhangsan'}
            console.log(this.abc, this.list)
          */

        },
        add(){
            
        },
        
        handleInput(id,e){
          


            let value = e.target.value
            this.objs[id].value= value

            // let  jsxObj = ( <div> 
            //     <p>content</p>
            //     <input value={this.objs[id].value} on-input={this.handleInput.bind(this,id)}></input>
            //      <span>{this.objs[id].value} </span>
            //     </div> )
            // this.objs[id].jsxObj = jsxObj
            // this.objs[id].instance.setJsx(this.objs[id].jsxObj)


        }
       
    }
}
</script>
<style>
.dialog_view{
 
}
</style>