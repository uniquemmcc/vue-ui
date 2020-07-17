
<script>
import RenderDom from '_c/render-dom'
export default {
    name: 'Dialog',
    components:{
        RenderDom
    },
    props:{
        title: {
            type: String,
            default: 'title'
        },
        width: {
            type: Number,
            default: 300
        },
        height: {
             type: Number,
            default: 300
        }

    },
    render(h){

        return (
            <div class="dialog" ref="outer" style={{width:this.dialogWidth, height: this.dialogHeight, left: this.left,top: this.top}} >
       
                <div class="dialog-title" on-mousedown={this.mousedown_t} on-touchstart={this.mousedown_t}>
                    <p>{this.title}</p>
                    <span class="iconfont   icon-close" on-click={this.handleClose}></span>
                </div>
                <div class="dialog-content">
                    <render-dom  renderFunction={this.renderFuc} ></render-dom>
                </div>   
                <div class="dialog-tigger-right" on-mousedown={this.mousedown_r}  on-touchstart={this.mousedown_r}></div>
                <div class="dialog-tigger-bottom" on-mousedown={this.mousedown_b}  on-touchstart={this.mousedown_b}></div>
                <div class="dialog-tigger-rightbottom" on-mousedown={this.mousedown_rb}  on-touchstart={this.mousedown_rb}></div>
            </div>
        )
    },
    data(){
        return{
            windowW:0,
            windowH:0,
            canMove: false,
            offsetR:0,   //窗口大小 
            offsetB:0,

            initR: 0,
            initB: 0,
            offsetL:0,  
            offsetT:0,
            ol:0,
            ot:0,
            jsxObj:null
        }
    },
    computed:{
        dialogWidth(){
            return `${this.offsetR}px`
        },
        dialogHeight(){
            return `${this.offsetB}px`
        },
        transform(){
            return `translate(${this.offsetL}px,${this.offsetT}px)`
        },

        left(){
            return `${this.offsetL}px`
        },
        top(){
            return `${this.offsetT}px`
        }
       
       
    },
    created(){
        this.offsetR = this.width
        this.offsetB = this.height
    },
    mounted(){

       this.init()
        
    },
    methods: {
        init(){
            this.$nextTick(()=>{

                    this.windowW = document.body.offsetWidth 
                    this.windowH = document.body.offsetHeight

                    //center
                    let w = this.$el.offsetWidth
                    let h = this.$el.offsetHeight
                    this.offsetL = this.ol = this.windowW/2 - w/2
                    this.offsetT = this.ot = this.windowH/2 - h/2
            })

        },

       renderFuc(h){
         
         

         let obj = this.jsxObj
     
        return (
               obj||''
           )
       
       },
       setJsx(jsxObj){
           this.jsxObj = jsxObj
  
       },
       handleClose(){
           this.$emit('close','')
       },
      
        mousedown_r(e){
            document.addEventListener('mousemove',this.mousemove_r)
            document.addEventListener('mouseup',this.mouseup_r)

            document.addEventListener('touchmove',this.mousemove_r)
            document.addEventListener('touchend',this.mouseup_r)

            const outer = this.$refs.outer.getBoundingClientRect()


            let x
            if(!e.changedTouches) {  //pc端
                x = e.pageX;
            } else {   //移动端
                x = e.changedTouches[0].clientX;
            }

            this.initR= outer.left + outer.width - x
            
           
            this.canMove = true
        },

        mousemove_r(e){
            if(!this.canMove)return
            const outer = this.$refs.outer.getBoundingClientRect()


            let x
            if(!e.changedTouches) {  //pc端
                x = e.pageX;
            } else {   //移动端
                x = e.changedTouches[0].clientX;
            }

            this. offsetR = x - outer.left + this.initR

            
            if(this.offsetR + outer.left>=this.windowW){
                this.offsetR = this.windowW - outer.left
            }

           
            
        },
        mouseup_r(){
            
            document.removeEventListener('mousemove',this.mousemove_r)
            document.removeEventListener('mouseup',this.mouseup_r)

            document.removeEventListener('touchmove',this.mousemove_r)
            document.removeEventListener('touchend',this.mouseup_r)

            this.canMove = false
        },
        mousedown_b(e){
            document.addEventListener('mousemove',this.mousemove_b)
            document.addEventListener('mouseup',this.mouseup_b)

            document.addEventListener('touchmove',this.mousemove_b)
            document.addEventListener('touchend',this.mouseup_b)


            const outer = this.$refs.outer.getBoundingClientRect()

            let y
            if(!e.changedTouches) {  //pc端
                y = e.pageY;
            } else {   //移动端
                y = e.changedTouches[0].clientY;
            }

            this.initB= outer.top + outer.height - y
            
            
            this.canMove = true
        },
        mousemove_b(e){
            if(!this.canMove)return
            const outer = this.$refs.outer.getBoundingClientRect()

            let y
            if(!e.changedTouches) {  //pc端
                y = e.pageY;
            } else {   //移动端
                y = e.changedTouches[0].clientY;
            }

            this. offsetB = y - outer.top + this.initB

            if(this.offsetB + outer.top>=this.windowH){
                this.offsetB = this.windowH - outer.top
            }
            
            
        },
        mouseup_b(){
            document.removeEventListener('mousemove',this.mousemove_b)
            document.removeEventListener('mouseup',this.mouseup_b)

            document.removeEventListener('touchmove',this.mousemove_b)
            document.removeEventListener('touchend',this.mouseup_b)

            this.canMove = false
        },
        mousedown_rb(e){
            this.mousedown_r(e)
            this.mousedown_b(e)
        },
        mousedown_t(e){
            document.addEventListener('mousemove',this.mousemove_t)
            document.addEventListener('mouseup',this.mouseup_t)

            document.addEventListener('touchmove',this.mousemove_t)
            document.addEventListener('touchend',this.mouseup_t)

            const outer = this.$refs.outer.getBoundingClientRect()

            let x, y
            if(!e.changedTouches) {  //pc端
                x = e.pageX
                y = e.pageY;
            } else {   //移动端
                x = e.changedTouches[0].clientX
                y = e.changedTouches[0].clientY;
            }

        
            
    
            this.initR = x
            this.initB = y
            


            this.canMove = true
        },
        mousemove_t(e){

    

            if(!this.canMove)return
            const outer = this.$refs.outer.getBoundingClientRect()
           
            

            let x, y
            if(!e.changedTouches) {  //pc端
                x = e.pageX
                y = e.pageY;
            } else {   //移动端

       
                x = e.changedTouches[0].clientX
                y = e.changedTouches[0].clientY;
            }

     


            
            this.offsetL = x -this.initR+this.ol
            this.offsetT = y - this.initB + this.ot

            if(this.offsetL<=0){
                this.offsetL = 0
            }
            if(this.offsetT<=0){
                this.offsetT = 0
            }
            if(this.offsetL + this.$el.offsetWidth>= this.windowW){
                this.offsetL = this.windowW - this.$el.offsetWidth
            }
            if(this.offsetT + this.$el.offsetHeight>= this.windowH){
                this.offsetT = this.windowH - this.$el.offsetHeight
            }
  
        },
        mouseup_t(){
            document.removeEventListener('mousemove',this.mousemove_t)
            document.removeEventListener('mouseup',this.mouseup_t)

            document.removeEventListener('touchmove',this.mousemove_t)
            document.removeEventListener('touchend',this.mouseup_t)

            this.canMove = false

            //起始值是会变化的
             this. ol= this.offsetL
            this. ot= this.offsetT


         
        }
        
    }
}
</script>
<style lang="less" scoped>
.dialog{ 
    font-size: 16px;
    color: #000;
    background: #fff;
    // width: 300px;
    // height: 300px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 1px 1px 1px  #ccc;
    box-sizing: border-box; 
    position: fixed;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    padding: 3px;
    overflow: hidden;
    
    &-title{
        // box-sizing: border-box; 
        background: #ccc;
        line-height: 28px;
       height: 28px;
    //    padding: 6px; 

    //    position: absolute;
    //    left: 0;
    //    top: 0;
    //    right:8px;


        cursor: move;
       user-select: none;

       display:flex;
       align-items: center;
       justify-content: space-between;
       padding: 0 10px;

       span{
           cursor: pointer;
       }
       
    }
    &-content{
        background: #fff;

        word-wrap: break-word;
        // padding: 6px;
       


        // position: absolute;      
        // left: 0;
        // top: 40px;
        // right: 8px;
        // bottom: 8px;
       
        flex: 1;

        overflow: auto;
        margin: 0px 0px 0px 0px; 
        // margin: 0px -8px 8px 0px;     
        // overflow-x: hidden;
        // overflow-y: scroll;
      
    }
    &-tigger-right {
        width: 6px;
        height: 100%;

        position: absolute;
        top: 0;
        right: 0;
        // z-index: 9999;
        cursor: w-resize;
        user-select: none;
    }
    &-tigger-bottom {
        width: 100%;
        height: 6px;

        position: absolute;
        left: 0;
        bottom: 0;
        // z-index: 9999;
        cursor: s-resize;
        user-select: none;
    }
    &-tigger-rightbottom {
        width: 6px;
        height: 6px;

        position: absolute;
        right: 0;
        bottom: 0;
        cursor: se-resize;
        z-index: 1;
        user-select: none;
    }
}

</style>>

