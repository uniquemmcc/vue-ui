






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
      default: ""
    },
    barColor: {
      type: String,
      default: "#2d8cf0"
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [],
      offset: 0,
      widthlist: [],
      obj: [],
      flag: false,
      oldi: 0,

      canMove:false,
      tx:0,
      ox:0,
      initx: 0,
      isMove: false,
      outerWidth:0
      // ulWidth:0
    };
  },
  components: {
    // tabContainer
  },

  watch: {
    value(newVal, oldVal) {
        // console.log(`newVal:${newVal},oldVal:${oldVal}`)
      //   console.log(this.widthlist[newVal])

      // if(this.flag){
      //   this.flag=true
      // this.$nextTick(() => {

        if(!newVal) return

      if (this.flag) {
        this.flag = false;
        // console.log("watch1", newVal, this.oldi);
        this.barMove(this.getIndexFor(newVal), this.oldi);
      } else {
        // console.log("watch2", newVal, oldVal);
        this.barMove(this.getIndexFor(newVal), this.getIndexFor(oldVal));
      }
      // });

      // }

      // console.log('this.value:'+this.value)
    }
    
  },
  mounted() {
    // console.log(this.getIndexFor(this.value))
    // this.barMove(this.getIndexFor(this.value),0)
    // console.log(this.barWidth)

    this.$nextTick(()=>{
        let ul = document.querySelector('#ulul')

        ul.addEventListener('mousedown',this.mousedown,true)
        ul.addEventListener('touchstart',this.mousedown,true)
        ul.addEventListener('click',(e)=>{ 
          
          
          // console.log('ul click')

        // console.log('Listener',this.isMove)
        if(this.isMove)
        event.stopImmediatePropagation();

        },true)
    })
 
  },
  methods: {
    getIndexFor(value) {
      return this.list.findIndex(item => {
        return item.key === value;
      });
    },

    handleClickTab(index) {
      //   this.index=index
      
      this.$emit("input", index);
    },
    barMove(newVal, oldVal) {
      if (!this.list.length) return;
      // console.log("barMove", newVal, oldVal);
      const count = Math.abs(oldVal - newVal);
      for (let i = 0; i < count; i++) {
        if (newVal < oldVal) this.offset -= this.list[newVal + i].offsetWidth;
        else if (newVal > oldVal)
          this.offset += this.list[newVal - i - 1].offsetWidth;
        else {
        }
      }
    },

    remove(index) {
      // console.log("tabs remove:"+index)

      // this.widthlist.splice(index,1)

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

      // console.log("要删掉的index" + index);
      this.oldi = this.getIndexFor(this.value);
      // console.log("oldi:" + this.oldi);

      if (index < this.oldi) {
        // console.log("小于");

        // console.log("key换成-----???:" + this.list[index + 1].key);
        this.offset -= this.list[index].offsetWidth;
        this.list.splice(index, 1);

        //  this.handleClickTab(this.list[index].key);
      } else if (index > this.oldi) {
        this.list.splice(index, 1);

        // this.handleClickTab(this.list[index].key);
      } else {
        this.flag = true;
        // console.log("等于");

        // let i= this.getIndexFor(this.value)

        // this.offset -= this.widthlist[index];
        // this.flag= false

        // console.log("key换成:" + this.list[index - 1].key);
        if (index === 0) {
          if (this.list[index + 1])
            this.handleClickTab(this.list[index + 1].key);
        } else {
          this.handleClickTab(this.list[index - 1].key);
        }

        this.list.splice(index, 1);
      }

      //需要
      if(this.list.length<=0) this.$emit("input", '')

      this.$nextTick(() => {
        // console.log(index , this.value)
        // })

        // console.log(this.list);
// this.list.splice(index, 1);
        this.setUlPosition(index,this.oldi)
      });

      //

      // this.barMove(index,this.value)
      // console.log(this.widthlist[index-1])

      
    },
    setUlPosition(index,oldi){
      //在最前面删除，需要确保移动回最前，在超过容器的情况且要确保不能拖拽超出范围
      // console.log(index,oldi)
      if(this.$refs.outer.offsetWidth-20 > this.$refs.ul.offsetWidth){
        this.tx = this.ox = 0 
      }else{

        if(this.tx < this.$refs.outer.offsetWidth-this.$refs.ul.offsetWidth-20)
        this.tx = this.ox = this.$refs.outer.offsetWidth-this.$refs.ul.offsetWidth-20
      }
      // else{

      // }
    },
    mousedown(e){
  // event.stopImmediatePropagation();
      document.addEventListener('mousemove',this.mousemove)
      document.addEventListener('mouseup',this.mouseup)
      document.addEventListener('touchmove',this.mousemove)
      document.addEventListener('touchend',this.mouseup)

      let x
      if(!e.touches) {  //兼容移动端
          x = e.pageX;
      } else {   //兼容PC端
          x = e.touches[0].clientX;
      }

      this.initx = x
      this.canMove = true
  
    },
    mousemove(e){
      
      if(!this.canMove)return

      let x
      if(!e.touches) {  //兼容移动端
          x = e.pageX;
      } else {   //兼容PC端
          x = e.touches[0].clientX;
      }
      
      // console.log("can",this.$refs.outer.offsetWidth-20,this.$refs.ul.offsetWidth)
      if(this.$refs.outer.offsetWidth-20 > this.$refs.ul.offsetWidth){
        return
      }
      // console.log(this.$refs.outer.offsetWidth-20,this.$refs.ul.offsetWidth)
      if(this.$refs.outer.offsetWidth-20 > this.$refs.ul.offsetWidth){
        return
      }

      this.tx = x - this.initx + this.ox
      if(this.tx>0){
        this.tx=0
      }
    
      if( this.tx < this.$refs.outer.offsetWidth-this.$refs.ul.offsetWidth-20 ){
        this.tx= this.$refs.outer.offsetWidth-this.$refs.ul.offsetWidth-20
      }


      // console.log('outer',this.$refs.outer)


      
     
      // this.offset=event.pageX - 
//  console.log("mousemove")
    },
    mouseup(e){

      
      let x
      if(!e.touches) {  //兼容移动端
          x = e.pageX;
      } else {   //兼容PC端
          // x = e.touches[0].clientX;
      }



       if (Math.abs( x -this.initx) > 10){
this.isMove=true
// console.log('this.isMove',this.isMove)
      }else{
        this.isMove= false
// console.log('this.isMove',this.isMove)
      }



      this.ox = this.tx
      this.canMove = false
      

      document.removeEventListener('mousemove',this.mousemove)
      document.removeEventListener('mouseup',this.mouseup)
      document.removeEventListener('touchmove',this.mousemove)
      document.removeEventListener('touchend',this.mouseup)

      // console.log("mouseup")

     
    }
    ,aaaa(){
      this.tx++
    }
  },
  computed: {
    tabsWidth() {
      if (this.width === 0) return "auto";
      return `${this.width}px`;
    },
    tabsHeight() {
      if (this.height === 0) return "auto";
      return `${this.height}px`;
    },
    barWidth() {
      if (!this.list.length&&!this.list[this.getIndexFor(this.value)]) {return `auto`; console.log('kong-------------')}
        console.log(this.list)

      const offsetWidth = this.list[this.getIndexFor(this.value)].offsetWidth;

      return `${offsetWidth}px`;
    },
    barAnmi() {
      return `translate3d(${this.offset}px, 0px, 0px)`;
    },
    transform() {
      return `translate(${this.tx}px,0px)`
    },
    ulWidth(){
      if (!this.list.length&&!this.list[this.getIndexFor(this.value)]) return 'auto';
      let width = 0
      this.list.forEach(item => {
        width+=item.offsetWidth
        // console.log(width)
        })
      
      return `${width+5}px`
    }
  },
  render() {
//     console.log(this.$children);
// console.log(this.ulWidth);

    // let obj =null
    this.$nextTick(() => {
      // if (
      //   this.$children.length &&
      //   this.$children[this.getIndexFor(this.value)]
      // ) {
  
      //   this.obj = this.$children[this.getIndexFor(this.value)].$slots.default;
       
      // } else {
      //   this.obj = null;
      // }

      if (
        this.list.length&&
        this.list[this.getIndexFor(this.value)]
      ) {
  
        this.obj = this.list[this.getIndexFor(this.value)].vcom.$slots.default;
       
      } else {
        this.obj = null;
      }
    });

    return (
        <div class="box" ref="outer">  
            <div class="tabs">
            
            
                <ul class="clearfix tabs-content"  ref="ul" id="ulul" style={{width:this.ulWidth,transform:this.transform}} >
                  <div
                    class="tabs-active-bar"
                    style={{
                      transform: this.barAnmi,
                      width: this.barWidth,
                      background: this.barColor
                    }}
                  ></div>
                  {this.$slots.default}
                </ul>
                
                <div class="tabs-container">
                  {this.obj}
                </div>
              
            
            </div>

        </div>

    );
  // <div class="tabs-container">
                //   {this.obj}
                // </div>

    // style={{width:this.tabsWidth,  height:this.tabsHeight}}
    /** style={{transform: this.barAnmi, width: this.barWidth, background: this.barColor}}*/
    /**    */
    // <tab-container class="tabs-container" obj={this.obj} ></tab-container>
  }
};
</script>
<style lang="less">
.box{
  //  width: 350px;
  //       height: 400px;
          border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
        padding: 10px;
        box-sizing: border-box;
}
.tabs {

  // margin: 10px;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  height: 100%;
  overflow: hidden;
 
  &-content {
    position: relative;

    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    
    // width: 368px;  //需要计算
    // transform: translate(50px,0px)

    user-select: none;
  }
  &-container {
    box-sizing: border-box;
    
    
    word-wrap: break-word;
    flex:1;
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