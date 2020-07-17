<template>
    <div class="tabs-view">

            <p style="margin-bottom:20px;">匀速滑动，加速滑动，增加， 删除</p>
            <button @click="handleAdd" style="margin-bottom:20px;"> 增加</button>
 
           <!-- <div style="border: 1px solid red"> -->
                <tabs v-model="idx" ref="tabsvv" class="tabs-view-tabs" v-show="idx">
                    <tab v-for="(item, index) in list" :key="`${_uid}_${item.title}`" :name="item.title" :index="item.title" 
                    :the-key="`${_uid}_${index}`"
                    :renderFuc="renderFuccc"
                    >
                        <p>{{ item.name }}</p>
                        <!-- <count-up :endVal="item.age"></count-up> 
                        <input :value="item.name"/><input  v-model="myvalue"/>
                        {{myvalue}}  -->

                    </tab>  
                  
                </tabs>
           <!-- </div> -->

            

              
            
      
    </div>

</template>
<script>
import tabs from '_c/tabs'



export default {
    data() {
        return {
            list: [
                {
                    title: '标签1',
                    name: '标签1的内容',
        
                },
                {
                    title: '标签2',
                    name: '标签2的内容',
            
                },
                {
                    title: '标签3',
                    name: '标签3的内容',
            
                },
                 {
                    title: '标签4',
                    name: '标签4的内容',
            
                }
                ,
                 {
                    title: '标签5',
                    name: '标签5的内容',
            
                },
                 {
                    title: '标签6',
                    name: '标签6的内容',
            
                },
                     {
                    title: '标签7',
                    name: '标签7的内容',
            
                },
                {
                    title: '标签8',
                    name: '标签8的内容',
            
                },
                 {
                    title: '标签9',
                    name: '标签9的内容',
            
                }
                ,
                 {
                    title: '标签10',
                    name: '标签10的内容',
            
                },
                 
            ],
            idx: '标签1',
            myvalue: '',
            abc: '',
            filter: 'all',
            stats: ['all', 'active', 'completed']
        }
    },
    components: {
        ...tabs


    },
    methods: {
        handleAdd(){
            let i = this.list.length
            this.list.forEach( (item)=> {if( item.title.indexOf(String(i))>-1 )i++ })

             let title= "标签"  + (i===0?1:i)
            let name = `${title}的内容`
            const obj =  {
                    // title: '标签五',
                    // name: '标签五的内容',
                    // age: 20,
                    title,
                    name
                }
           
            console.log(obj)
            if(!this.list.length) this.idx = obj.title //这个要放在前面，要确保先修改，不然报错,出现这个原因是因为之前数组都删光后忘记置空，现在应该已修复
            this.list.push(obj)
             
        },

        handleChangeTab (value) {
        this.filter = value
        },
         getIndexFor(value){
  
        return this.list.findIndex( item => {
            return item.title === value
        })
        
        },
        remove(index,event){
            event.stopPropagation()
            // console.log(event,index)
            const myindex = this.getIndexFor(index)
            // console.log('myindex',myindex)
            this.list.splice(myindex,1)
            this.$refs.tabsvv.remove(myindex)
        },
        renderFuccc(h, data){

            return (
                <div style="display:flex;">
                    <span style="padding:5px;">{data.name}</span>
                   
                    <span class="iconfont  icon-close" style="margin-left:10px;cursor: pointer;font-size:20px;padding:5px;"  on-click={this.remove.bind(this,data.index)} ></span>
                </div>
            )
        }
    },
    mounted(){
        // setTimeout(()=>{
        //     this.$nextTick(()=>{
        //         this.abc = '12244666777'
            
        //     })
            
        // },3000)
                
                // this.$nextTick(()=>{
                //     if(sessionStorage.getItem('isfresh')) return

                   

                //     sessionStorage.setItem('isfresh', true)
                //     location.reload()
                    
                // })
    }
}
</script>
<style lang="less" scoped>
.tabs-view{
    font-size: 16px;
    
    &-tabs{
        // margin-left: 20px;
        width: 100%;
        height: 400px;
        
    }
}
</style>>
