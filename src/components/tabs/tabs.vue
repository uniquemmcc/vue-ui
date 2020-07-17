






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

      oldTime: 0,
      isLeft: false,
      isaAmin: false,

      theW: 20,    //.box 的padding + ul的margin   左边30 + 右边30  

      canleft: false,
      canright: true
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
    },
    ulWidth(newV,oldV){
      
      if(parseInt(newV)>this.$refs.ulBox.offsetWidth){
          
          this.theW = 80
      }else{
        this.theW=20
      }
    },
    tx(newV,oldV){
      
      
      if(newV===0){
        this.canleft = false
      }else{
        this.canleft = true
      }
      if(newV === this.outerWidth - parseInt( this.ulWidth )-this.theW){
        this.canright = false
      }else{
        this.canright = true
      }

  

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
      if( this.outerWidth - this.theW > parseInt( this.ulWidth ) ){
        this.tx = this.ox = 0 

     
      }else{

        if( this.tx < this.outerWidth - parseInt( this.ulWidth ) - this.theW )
        this.tx = this.ox = this.outerWidth - parseInt( this.ulWidth ) - this.theW

      }
    
      // else{

      // }
    },
    mousedown(e){
this.isaAmin = false


  // event.stopImmediatePropagation();
      document.addEventListener('mousemove',this.mousemove)
      document.addEventListener('mouseup',this.mouseup)
      document.addEventListener('touchmove',this.mousemove)
      document.addEventListener('touchend',this.mouseup)

      let x
      if(!e.changedTouches) {  //pc端
          x = e.pageX;
      } else {   //移动端
          //x = e.touches[0].clientX;
          x= e.changedTouches[0].clientX;
      }

      this.initx = x
      this.canMove = true


      this.oldTime = Date.now()
      
    },
    mousemove(e){

      
      if(!this.canMove)return

      

      let x
      if(!e.changedTouches) {  //pc端
          x = e.pageX;
      } else {   //移动端
          //x = e.touches[0].clientX;
          x= e.changedTouches[0].clientX;
      }
      
      // console.log("can",this.$refs.outer.offsetWidth-this.theW,parseInt( this.ulWidth ))
      if( this.outerWidth - this.theW > parseInt( this.ulWidth )){
        return
      }
      // console.log(this.$refs.outer.offsetWidth-this.theW,parseInt( this.ulWidth ))
      if( this.outerWidth - this.theW > parseInt( this.ulWidth )){
        return
      }

      if(x>= this.initx){
        this.isLeft= false
      }else{
        this.isLeft = true
      }

      this.tx = x - this.initx + this.ox
      if(this.tx>0){
        this.tx=0
      }
    
      if( this.tx < this.outerWidth - parseInt( this.ulWidth )-this.theW ){
        this.tx= this.outerWidth - parseInt( this.ulWidth )-this.theW
      }


      // console.log('outer',this.$refs.outer)


    
      
     
      // this.offset=event.pageX - 
//  console.log("mousemove")
    },
    mouseup(e){

      
      let x
      if(!e.changedTouches) {  //pc端
          x = e.pageX;
      } else {   //移动端
          //x = e.touches[0].clientX;
          x= e.changedTouches[0].clientX;
      }



       if (Math.abs( x -this.initx) > 10){
this.isMove=true
// console.log('this.isMove',this.isMove)
      }else{
        this.isMove= false
// console.log('this.isMove',this.isMove)
      }



      //加速度
       this.a()
  


      this.ox = this.tx     //保存最后停留的位置， 下一次滑动就在这一基础上
      this.canMove = false
      

      document.removeEventListener('mousemove',this.mousemove)
      document.removeEventListener('mouseup',this.mouseup)
      document.removeEventListener('touchmove',this.mousemove)
      document.removeEventListener('touchend',this.mouseup)

      // console.log("mouseup")

     
    }
    ,a(){
      
          
         //防止 一开始 不超过父容器，所以不让滑动 
        if( this.outerWidth - this.theW > parseInt( this.ulWidth )){
          return
        }


    
      if(this.isMove){    
   
        let time = Date.now()-this.oldTime
        if( time<=150 ){

          this.isaAmin = true
        
 

              let fudu = 0

            if(time<=80){
                fudu = 1200
              }else if(time<=150){
                fudu = 600
              }else if(time<=300){
                fudu = 300
              }
              // console.log(fudu)

              if(this.isLeft){
                this.tx= this.tx - fudu
              }else{
                this.tx= this.tx + fudu
              }
              
        
              if(this.tx>0){
                this.tx=0
              }
            
              if( this.tx < this.outerWidth - parseInt( this.ulWidth )-this.theW ){
                this.tx= this.outerWidth - parseInt( this.ulWidth )-this.theW
              }

              // this.isaAmin = false

        }
      }     
    },
    handleLeft(){
     
      if(!this.canleft)return

      this.tx=this.ox = 0
    },
    handleRight(){
      if(!this.canright)return
  

      this.tx = this.ox = this.outerWidth - parseInt( this.ulWidth )-this.theW
      
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
      if (!this.list.length&&!this.list[this.getIndexFor(this.value)]) {return `auto`; }
        // console.log(this.list)

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
      
  
      return `${width}px`
    },
    outerWidth(){
     
      return this.$refs.outer.offsetWidth
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

//  <div  ref="ulBox" style="overflow:hidden;"   >
    return (
        <div class="box" ref="outer">  

            <div class="tabs">



                  <div style="position: relative;">
            { this.theW=== 80 ? <span  class={['iconfont' ,'icon-left', 'tabs-left', this.canleft ?'':'tabs-notleft' ] }  on-click={this.handleLeft}></span> : ''}
            { this.theW=== 80 ? <span class={['iconfont', 'icon-right', 'tabs-right', this.canright ?'':'tabs-notright' ] }   on-click={this.handleRight}></span> : ''}
                  <div  ref="ulBox" class={ this.theW === 80 ? 'theW': '' } style="overflow:hidden;margin-bottom:10px;"   >
                  <ul class={ ['tabs-content',this.isaAmin?'a-anim':'']}   ref="ul" id="ulul" style={{width:this.ulWidth,transform:this.transform}} >
                    <div
                      class="tabs-active-bar"
                      style={{
                        transform: this.barAnmi,
                        width: this.barWidth,
                        background: this.barColor,
                        
                      }}
                    ></div>
                    {this.$slots.default}
                  </ul>
                  </div>
                  </div>

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

          border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #ccc;
        padding: 10px;
        box-sizing: border-box;
        
}
.tabs {

 
  box-sizing: border-box;
  display:flex;
  flex-direction:column;
  height: 100%;
  



  &-left {
    position:absolute;
    left:0px;
    top:5px;
    font-size:20px;
     line-height:20px;
    padding: 5px;
    color: #000;
    cursor: pointer;
  }
 
  &-right {
    position:absolute;
    right:0px;
    top:5px;
    font-size:20px; 
    line-height:20px;
    padding: 5px;
    color: #000;
    cursor: pointer;
   
  }
   &-notleft {
    cursor:not-allowed!important;
    color: #ddd!important;

  }
  
   &-notright {
    cursor:not-allowed!important;
    color: #ddd!important;

  }

 
  &-content {

     
    display: flex;

    box-sizing: border-box;
    // margin: 0 20px 10px 20px;
    padding: 0;
    
    
    

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

.a-anim{
  transition: 0.1s ease-in-out;
}

.theW{
  margin: 0px 30px 10px 30px;
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