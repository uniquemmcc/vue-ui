






<script>



import tabContainer from "./tabContainer.vue";
export default {
  provide() {
    return {
      tabsRoot: this
    };
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    barColor: {
      type: String,
      default: '#2d8cf0'
    }
  },
  data() {
    return {
      list: [],
      offset: 0,
      widthlist: [],
      obj:[],
      flag: true,
    };
  },
  components: {
    tabContainer
  },

  watch: {
    value(newVal, oldVal) {
      //   console.log(oldVal,newVal)
      //   console.log(this.widthlist[newVal])
     
      // if(this.flag){
      //   this.flag=true
        this.barMove(newVal, oldVal);
      // } 

      console.log('this.value:'+this.value)
    }
    ,
    list(){
      // console.log(4444)
      
    }
  },
  mounted(){
          this.barMove(this.value,0)
        
  },  
  methods: {
    handleClickTab(index) {
      //   this.index=index
      // console.log(index)
      this.$emit("input", index);
    },
    barMove(newVal, oldVal) {
      const count = Math.abs(oldVal - newVal);
      for (let i = 0; i < count; i++) {
        if (newVal < oldVal) this.offset -= this.widthlist[newVal + i];
        else if (newVal > oldVal) this.offset += this.widthlist[newVal - i - 1];
        else {
        }
      }
    },
    getli(){
      console.log(this.$children)
    },
    remove(index){


      // console.log("tabs remove:"+index)
 
this.list.splice(index,1)
      this.widthlist.splice(index,1)

// let iii = 0 
//    this.list.forEach((item,item_index)=>{
//   // console.log(item)
//   // item.setIndex(item_index)
//   // i++
//   console.log(item_index)
//   item.myindex = item_index
  

// })
//    this.list.forEach((item,item_index)=>{
//   console.log(item.myindex)




// })


if(index<=this.value){

  

let i= this.value
// this.offset -= this.widthlist[index];
// this.flag= false
this.handleClickTab(i-1)



// this.obj = this.list[this.value].$slots.default
}

//   
 

    
      console.log(this.list,this.widthlist)
      
      // this.barMove(index,this.value)
      // console.log(this.widthlist[index-1])
      
    }
  },
  computed: {
    barWidth() {
      return `${this.widthlist[this.value]}px`;
    },
    barAnmi() {
      return `translate3d(${this.offset}px, 0px, 0px)`;
    },
    slotList(){
      return  this.list.map( item => item.$slots.default)
    },
    getliList(){
      return this.$children[this.value]
    }
  }
  ,
  render(){
    // console.log(111)
    
    // let obj =null
      this.$nextTick(()=>{
            
        //   if(this.$children[this.value]){
        // // console.log(this.$children)
        // //  console.log(this.$children[this.value])
        // //  console.log(this.$children[this.value].$slots.default)
        // this.obj = this.$children[this.value].$slots.default
        // // console.log(this.obj)

        // }
          if(this.list[this.value]){
        // console.log(this.$children)li
        //  console.log(this.$children[this.value])
        //  console.log(this.$children[this.value].$slots.default)
        this.obj = this.list[this.value].$slots.default
        // console.log(this.obj)

        }


     
      })
   
      return(

            <div class="tabs">
        <ul class="clearfix tabs-content">
        <div class="tabs-active-bar" style={{transform: this.barAnmi, width: this.barWidth, background: this.barColor}}></div>
        {this.$slots.default}
        </ul>

       <button on-click={this.getli}>get</button>
          
        {this.obj}
     
        
        </div>
      )

      // <tab-container class="tab-container" panes={this.list} ></tab-container>
  }
};
</script>
<style lang="less">
.tabs  {

   margin: 20px;
   border-radius: 5px ;
   border: 1px solid #ccc;
   box-shadow: 1px 1px 1px  #ccc;
   padding: 10px;
   &-content{
       position: relative;

       
   } 
  
  &-active-bar {
    position: absolute;
    background: #2d8cf0;
    // width: 235px;
    height: 2px;
    left: 0;
    bottom: 0;
    // transform: translate3d(90px, 0px, 0px);
    transition: 0.3s ease-in-out;
  }

  
}

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>