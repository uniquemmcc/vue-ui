import Dialog from './Dialog.vue'
import show from './function'
export default (Vue)=> {
    Vue.component(Dialog.name, Dialog)
    Vue.prototype.$showDialog = show
}