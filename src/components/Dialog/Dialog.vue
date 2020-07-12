
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
            default: ''
        }
    },
    render(h){

        return (
            <div class="dialog" ref="outer" style={{width:this.width, height: this.height, transform: this.transform}} >
       
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
            canMove: false,
            offsetR:300,
            offsetB:200,
            offsetL:-150,
            offsetT:-100,
            initR: 0,
            initB: 0,
            ol:-150,
            ot: -100,
            jsxObj:null
        }
    },
    computed:{
        width(){
            return `${this.offsetR}px`
        },
        height(){
            return `${this.offsetB}px`
        },
        transform(){
            return `translate(${this.offsetL}px,${this.offsetT}px)`
        }
        // left(){
        //     return `${this.offsetL}px`
        // },
        // top(){
        //     return `${this.offsetT}px`
        // }

    },
  
    methods: {

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
            if(!e.touches) {  //兼容移动端
                x = e.pageX;
            } else {   //兼容PC端
                x = e.touches[0].clientX;
            }

            this.initR= outer.left + outer.width - x
            
           
            this.canMove = true
        },

        mousemove_r(e){
            if(!this.canMove)return
            const outer = this.$refs.outer.getBoundingClientRect()


            let x
            if(!e.touches) {  //兼容移动端
                x = e.pageX;
            } else {   //兼容PC端
                x = e.touches[0].clientX;
            }

            this. offsetR = x - outer.left + this.initR
            
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
            if(!e.touches) {  //兼容移动端
                y = e.pageY;
            } else {   //兼容PC端
                y = e.touches[0].clientY;
            }

            this.initB= outer.top + outer.height - y
            
            
            this.canMove = true
        },
        mousemove_b(e){
            if(!this.canMove)return
            const outer = this.$refs.outer.getBoundingClientRect()

            let y
            if(!e.touches) {  //兼容移动端
                y = e.pageY;
            } else {   //兼容PC端
                y = e.touches[0].clientY;
            }

            this. offsetB = y - outer.top + this.initB
            
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
            if(!e.touches) {  //兼容移动端
                x = e.pageX
                y = e.pageY;
            } else {   //兼容PC端
                x = e.touches[0].clientX
                y = e.touches[0].clientY;
            }

        
    
            this.initR = x
            this.initB = y

            this.canMove = true
        },
        mousemove_t(e){

    

            if(!this.canMove)return
            const outer = this.$refs.outer.getBoundingClientRect()
           

            let x, y
            if(!e.touches) {  //兼容移动端
                x = e.pageX
                y = e.pageY;
            } else {   //兼容PC端

       
                x = e.touches[0].clientX
                y = e.touches[0].clientY;
            }

     

            this.offsetL = x - this.initR + this.ol
            this.offsetT = y - this.initB + this.ot
            
         
            
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
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 1px 1px 1px  #ccc;
    box-sizing: border-box; 
    position: fixed;
    left: 50%;
    top: 50%;
    // transform: translate(-150px,-100px);
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
        z-index: 9999;
        cursor: w-resize;
        user-select: none;
    }
    &-tigger-bottom {
        width: 100%;
        height: 6px;

        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 9999;
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
        z-index: 10000;
        user-select: none;
    }
}

</style>>

