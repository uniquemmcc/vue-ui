<template>
    <submenu>
         <li slot="fromparent">{{ parent.title }}</li>
         <template  v-for="(item,index) in parent.children" >
                    <menu-item  v-if="!item.children"  :key="`${theKey}_${index}`">{{ item.title }}</menu-item>  
                    <re-submenu v-else  :key="`${theKey}_${index}`" :parent="item" :the-key="`${theKey}_${index}`"></re-submenu>
         </template>
    </submenu>
</template>
<script>
import MenuItem from './MenuItem.vue'
import Submenu from './Submenu.vue'
export default {
    name: 'ReSubmenu',
    props: {
        parent: {
            type: Object,
            default: ()=>({})
        },
        theKey: {
            type: String,
            default: ''
        }
    },
    components: {
        MenuItem,
        Submenu
    }
}
</script>
<style>
</style>