<template>
    <div class="review">
        <menu>
            <template v-for="(item, index) in list" >
                <menu-item v-if="!item.children" :key="`menu_${index}`">{{ item.title }}</menu-item>
                <re-submenu v-else :key="`menu_${index}`" :parent="item" :the-key="`menu_${index}`"></re-submenu>
            </template>
        </menu>

    </div>
</template>
<script>
import Menu from '_c/Menu'
export default {
    name:'ReView',
    components:{
        ...Menu,

    },
        
    
    data(){
        return{
            list: [
                {
                  title: '111',
                  children: [
                                    {
                                        title: '111-111'      
                                    },
                                    {
                                        title: '111-222' ,
                                        children: [
                                            {
                                                title:'111-222-111'
                                            }
                                        ]     
                                    }
                  ]           
                },
                 {
                  title: '222'      
                },
                {
                  title: '333',
                  children: [
                       {
                         title: '333-111'      
                       },
                       {
                         title: '333-222'      
                       },
                       {
                         title: '333-333', 
                         children: [
                             {
                                title: '333-333-111'      
                             },
                             {
                                title: '333-333-222'      
                             },
                             {
                                title: '333-333-333', 
                                children: [
                                    {
                                        title: '333-333-333-111'      
                                    },
                                    {
                                        title: '333-333-333-222'      
                                    }
                                ]     
                             }
                         ]     
                       }
                  ]      
                }

            ]
        }
    }
}
</script>
<style lang="less" scoped>
.review {
    width: 300px;
    font-size: 16px;
    
}

</style>