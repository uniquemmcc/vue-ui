<script>
export default {
    inject: ['tabsRoot'],
    props: {   
        panes: {
            type: Array,
            default: () => []
        },
        obj:{
            type: Array,
            default: () => []
        }
    },
    mounted(){
        // console.log(this.list)
        
    },
    data(){
        return{
            myobj:[]
        }
    },
    render() {
        console.log(this.panes)
        
    //   this.$nextTick(()=>{
            
    //       if(this.panes[this.tabsRoot.value]){
    //     // console.log(this.$children)
    //     //  console.log(this.$children[this.value])
    //     //  console.log(this.$children[this.value].$slots.default)
    //     this.myobj = this.panes[this.tabsRoot.value].$slots.default
    //     console.log(this.myobj)




    //     }
     
    //   })
     return(
           <div class="tabc">
             {this.obj}
           </div>
        )
    // }
     
 
         
        
    }
}
</script>
<style>
.tabc{

    overflow: auto; 
    word-wrap: break-word;
}
</style>