import Dialog from './Dialog.vue'

export default {
    extends: Dialog,

    method:{
        renderFun(h){
            return h(
                <div>content</div>
            )
        }
    },
    render(h){

        
        this.$nextTick(()=>{
            console.log(this)
            this.renderFun(h)
        })
        
    }
}