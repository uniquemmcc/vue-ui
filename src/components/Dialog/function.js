import Vue from 'vue'
// import Component from './func-dialog'
import Component from './Dialog.vue'

const DialogConstructor  = Vue.extend(Component)


const instances = []

let seed = 1
let zIndex = 1000


const removeInstance = (instance) => {
    if (!instance) return
    const len = instances.length
    const index = instances.findIndex(inst => instance.id === inst.id)
  
    instances.splice(index, 1)
  
    if (len <= 1) return
    // const removeHeight = instance.vm.height
   
}

 const show = ( options ) => {


    const instance = new DialogConstructor({
        //propsData: 这里果然是可以传属性，这样就可以直接传render了，暂时不花时间修改了，以后用到再修改
        propsData: {
            ...options
        }
    })
    const id  = `dialog_${seed++}`
    zIndex = zIndex + 1
    

    instance.id = id
    instance.zIndex = zIndex


    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    

    

    instances.push(instance)

    instance.vm.$on('close', () => {
    
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()
    })
    instance.vm.$on('changeZIndex',()=>{
        let myZIndex = instance.zIndex

        let max = myZIndex
        instances.forEach(item=>{
            if(max< item.zIndex) 
             max = item.zIndex
           
        })

        instance.zIndex = max +1

    })
    return instance.vm
}

export default show