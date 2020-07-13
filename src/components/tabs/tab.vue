




<script>
import RenderDom from '_c/render-dom'
export default {
  inject: ["tabsRoot"],
  data() {
    return {
      offset: 0
  
    };
  },
  props: {
    name: [String, Number],
    index: [String, Number],
    theKey: String,
    renderFuc:Function 
  },

    components: {
        RenderDom
    },
  methods: {
    handleClick(event) {
      
        console.log('li click')
       this.tabsRoot.handleClickTab(this.index)
    
    }
  

  }

  ,
    mounted() {
 
    //   console.log(this)
    // this.tabsRoot.list.push(this);
    // this.tabsRoot.widthlist.push(this.$el.offsetWidth)
    // console.log(111)
    // console.log(this.theKey)
    this.$nextTick(()=>{
         const obj = {
      key: this.index,
      vcom:this,
      offsetWidth:this.$el.offsetWidth
    }
 
    this.tabsRoot.list.push(obj)

      // console.log(this.tabsRoot.list)
    })
   
    
  },
  computed: {
    className() {
      return ["tab"];
    },
    fontColor(){

      return this.tabsRoot.value === this.index ? this.tabsRoot.barColor : ""
        
    },
    active () {
      return this.tabsRoot.value === this.index
    }
  }
  ,
  render(h){
    

      return (
           <li  class={this.className} on-click={this.handleClick}  style={{color:this.fontColor}}> 
           
           
         
           { this.renderFuc?<render-dom  renderFunction={this.renderFuc} data={{name:this.name,index:this.index}}></render-dom>:this.name }
          
           </li>
      )
  }


};
</script>
<style lang="less">
.tab {
  list-style: none;
  float: left;

  user-select: none;
  padding: 5px 10px;
  box-sizing: border-box;
  //  flex: 1; 
    
//   &-active {
   
//   }
}
</style>