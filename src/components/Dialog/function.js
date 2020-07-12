import Vue from 'vue'
// import Component from './func-dialog'
import Component from './Dialog.vue'

const DialogConstructor  = Vue.extend(Component)


const instances = []

let seed = 1


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
            title: options.title
        }
    })
    const id  = `dialog_${seed++}`
    instance.id = id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    

    

    instances.push(instance)

    instance.vm.$on('close', () => {
    
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()
    })
    return instance.vm
}

export default show