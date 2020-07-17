<template>
    <div style="font-size:16px;">
        <vistual-list :list="list"  class="vistual-list" :count="8" :keep-state="32" :itemHeight="60" :estraOffset="0"
        
        ref="vl"
        :index.sync="index"
        @scrollTop="scrollTopEvent"
        >
            <template v-slot:itemObj="{item}">
                    <div class="list-item">
                       
                        <!-- <img :src="item.images[0]" style="width:100px;height:100px;"/> -->
                      
                        <span> {{item.item.desc}}</span>
                       <!-- <img :src="item.img" style="width:50px;height:40px;"> -->
     
                    </div>
                    
            </template>

        </vistual-list>

        <div style="margin-top:20px;">
            <input type="number"  :value="myindex" @input="handleInput" > 页
        </div>

       
         
    </div>
</template>
<script>

import VistualList from '_c/VistualList'
import axios from 'axios'

export default {
    data(){
        return{
            list: [
                
            ],
            pageIndex:1,
 
           index:0,
            myindex:1,
            scrollTop:0
        }
    },
    filters:{
        abc(value){
            return value+1
        }
    },
    components: {
        VistualList
    },
    mounted(){
        let i =1
        while(i<=200000){
            // let ran = Math.random()*100
            // if(ran >50){
            //     // console.log(ran)
            //     this.list.push({desc:i ,type: ran })
            // }else {
                this.list.push({desc:i})
            // }
            

            i++
        }   

/*加载网络图片* 
        axios.get(`https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/67`).then((res)=>{
   
            if(res.data.status===100){
                //   this.list = this.list.concat(res.data.data)
               this.list =  res.data.data.map( (item,index)=> {
                    // console.log(index,item)
                    return {index, img: item.images[0]}
                })
  

            //     let i = 5
            //     while(i--){
            //    this.list = this.list.concat( this.list )
            //     }
                
                // console.log(this.list)
            }
          
        }).catch((err)=>{console.log(err)})  
        
 **/         

    },
    methods:{
        // handleBottom(cb){

        
        //         axios.get(`https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/12`).then((res)=>{
            
        //             if(res.data.status===100){
        //                 this.list = this.list.concat(res.data.data)
                    
        //                 cb(true)
        //             }
                            
        //         }).catch((err)=>{console.log(err)})     

        // }
        handleInput(e){
      
      
         this.myindex = (Number)(e.target.value)
         this.index = (Number)(e.target.value)-1
        //  console.log((Number)(e.target.value))
         this.$refs.vl.change()

        },
        scrollTopEvent(e){
   
          this.scrollTop = e
        }
    },
    watch:{
        index(newV){
            this.myindex = newV+1
        }
    },
    beforeRouteEnter(to,from,next){
        // console.log('1111111111')
        
        next( vm=>{
          //  this.$refs.vl.setScroll(100)
     
          vm.$refs.vl.setScroll(vm.scrollTop)
        })
     
       
    },
}
</script>
<style lang="less">
.vistual-list{
    // margin: 100px 0px 0px 100px;
    font-size:16px;
    .list-item{
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        width: 100%;
        height: 100%;
        padding: 10px;
        // line-height: 150px;
    }
}

</style>