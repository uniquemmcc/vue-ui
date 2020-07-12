<template>
    <div class="vistualList" :style="{height:`${vpHeight}px`}"
    @scroll="this.handleScroll"
    ref="outer"
    >
        <div  class="vistualList-container"  ref="box"      
        :style="{height:`${containerHeight}px`}"
        >
            <li v-for="(item,index) in sliceList " :key="`VistualList_${index}`"  ref="li">
             
               
                   <slot name="itemObj" :item="{item}"></slot>
               
                
            </li>
            
            <template v-if="hasBottom">    
                <div  v-show="isBottom" >
                    <div  v-if="isfresh">
                        <p>到底了</p>
                        <p>到底了</p>
                        <p>到底了</p>
                        <p>到底了</p>
                        <p>到底了</p>
                        <p>到底了</p>
                    </div>
                    <div v-else>
                        没有更多了
                    </div>
                </div>
            </template>
            
        </div> 
        
        
    </div>
  

</template>
<script>
export default {
    name: 'VistualList',
    data(){
        return{
            sliceList: [

            ],


            // index:0,
            moreIndex:0,
            containerHeight:0,
            vistualHeight:0,
            vpHeight:0,
            // canScroll:0,
            isBottom: false,
            isfresh: true,
            vis1:0,
            max:0,
           
        }
    },
    props: {
        list: {
            type: Array,
            default: ()=> []
        },
        count: {
            type: Number,
            default: 4
        },
        itemHeight:{
            type: Number,
            default: 100
        },
        keepState:{
            type: Number,
            default: 12
        },
        estraOffset:{
            type: Number,
            default: 0
        },
        hasBottom:{
            type: Boolean,
            default: false
        },
        index:{
            type: [Number,String],
            default: 0
        }

        
    },
    computed:{
        // containerHeight(){

        //     return this.list.length*this.itemHeight
        
        // },
        // vistualHeight(){
        //     return this.count*this.itemHeight
        // },
        // vpHeight(){
        //     return this.count*this.itemHeight +this.estraOffset
        // },
        canScroll(){
            return this.containerHeight -this.vpHeight-this.vistualHeight
        }
        
    },
    watch: {
        
        list(){
         
            this.sliceList = this.list.slice(0+ this.count*this.moreIndex , this.keepState+ this.count*this.moreIndex)
       
        this.$nextTick(()=>{
            
        this.vistualHeight = this.vis1 =   this.getVis(0,8)
            // console.log(this.vistualHeight)
            this.vpHeight= this.vistualHeight+this.estraOffset
            let length = Math.floor(this.list.length /this.count)
            this.containerHeight = this.list.length *(this.vistualHeight/8)
            this.max=length-1
         
        })
   
       
       },
        isBottom(newVal){
          
            if(newVal){

                console.log('到底了',this.isBottom)
               this.$emit('on-bottom',(isfresh)=>{
                  
                  if(isfresh){
                        // this.$nextTick(()=>{
                   

                                this.isBottom= false

                                // this.sliceList = this.list.slice(0+ this.count*this.moreIndex , this.keepState+ this.count*this.moreIndex)

        
                        //  })
                  }else{
                      //没有更多了
                    this.isfresh =  isfresh
                  }
                    
                   
                
                })

            }
            
 
        },
        index(newVal){

            
                 if(newVal<1)this.$emit('update:index',0)
            if(newVal> this.max) this.$emit('update:index',this.max)
            if(!newVal ) this.$emit('update:index',0)

            // console.log(newVal)
        
                
  

// if(newVal===0) {
//        this.sliceList= this.list.slice(0+ this.count*newVal , this.keepState+ this.count*newVal )

//                 this.$refs.box.style.paddingTop = (newVal)*this.vistualHeight+'px'
                
//                 // let ch = this.isBottom? this.containerHeight+this.loadingOffset : this.containerHeight
//                 let ch = this.containerHeight
//                 let pb = (ch - this.vistualHeight * 3 - newVal*this.vistualHeight) //必须要3层才能显示完全，padding-top+3层+padding-bottom
//                 // console.log(pb)
//                 pb = pb>0?pb: 0
                
//                 this.$refs.box.style.paddingBottom = pb+'px'
// }else {

//  if(newVal===1)return

//     newVal = newVal -1
//     this.sliceList= this.list.slice(0+ this.count*newVal , this.keepState+ this.count*newVal )

//                 this.$refs.box.style.paddingTop = (newVal)*this.vistualHeight+'px'
                
//                 // let ch = this.isBottom? this.containerHeight+this.loadingOffset : this.containerHeight
//                 let ch = this.containerHeight
//                 let pb = (ch - this.vistualHeight * 4 - newVal*this.vistualHeight) //必须要3层才能显示完全，padding-top+3层+padding-bottom
//                 // console.log(pb)
//                 pb = pb>0?pb: 0
                
//                 this.$refs.box.style.paddingBottom = pb+'px'
// }




                // if(this.keepState+ this.count*newVal >this.list.length)return

                this.sliceList= this.list.slice(0+ this.count*newVal , this.keepState+ this.count*newVal )

                this.$refs.box.style.paddingTop = (newVal)*this.vistualHeight+'px'
                
                // let ch = this.isBottom? this.containerHeight+this.loadingOffset : this.containerHeight
                let ch = this.containerHeight
                let pb = (ch - this.vistualHeight * 3 - newVal*this.vistualHeight) //必须要3层才能显示完全，padding-top+3层+padding-bottom
                // console.log(pb)
                pb = pb>0?pb: 0
                
                this.$refs.box.style.paddingBottom = pb+'px'

       
  
             
          
           
           
        },

    },
 
    mounted(){
        
    },
    methods:{
        handleScroll(event){
            

            // console.log(   event.srcElement.scrollTop)
            
            const el = event.srcElement || event.target


          


        
            //滚动条最大值是等于 容器高度 - 可视区域 
            //再要求渲染列表滚到最底部，距离最顶部就是要忽略掉渲染列表的高度
                // if(this.scrollTop>this.canScroll) {this.scrollTop=this.canScroll}
                // this.index = Math.floor(el.scrollTop/this.vistualHeight)
                
                let index = Math.floor(el.scrollTop/this.vistualHeight)
           
                this.$emit('update:index',index)
               
                //可以取小数部分 就是每一个keepstate 区间的present
            
              
                if(el.scrollTop>=this.containerHeight -this.vpHeight){
                    this.moreIndex=this.index
                    this.isBottom = true    
                    
                }


                // this.scrollTop = el.scrollTop
                this.$emit('scrollTop',el.scrollTop)
            


        },
        initData(){
          
                this.containerHeight = this.list.length*this.itemHeight
                this.vistualHeight = this.count*this.itemHeight
                this.vpHeight = this.count*this.itemHeight +this.estraOffset
                this.canScroll = this.containerHeight -this.vpHeight-this.vistualHeight
           
        },
        getVis(start , end){
                let lis = this.$refs.li.slice(start,end)
                // console.log(lis)
            let sum = 0 
            lis.forEach(item => {
                sum+=item.getBoundingClientRect().height
            });
            // console.log(sum)
           return sum
        },
        change(){
            this.$nextTick(()=>{
  this.$refs.outer.scrollTop=this.index*this.vistualHeight
            // console.log('???????????')
            })
          
        },
        setScroll(scrollTop){
            this.$nextTick(()=>{
                    this.$refs.outer.scrollTop=scrollTop
                        // console.log('???????????')
            })
        }
    }
    
}
</script>
<style lang="less">
.vistualList{
    
    overflow-y: auto;

    &-container {
      box-sizing: border-box;
        width: 100%;

        // height: 4020px;
        list-style: none;
        .item {
            box-sizing: border-box;
        
            height: 100%;
        }
    }
}
</style>