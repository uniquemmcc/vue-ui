<template>
<div class="submenu">
        <div @click="handleToggle" class="submenu-had" >
            <div style="display:flex;align-items:center;">
                 <slot name="fromparent"></slot>
                 <span class="icon" 
                 :style="{ transform: `rotate(${toggle ? 180 : 0}deg)` }"
                 :class="toggle?'icon-toggle':''"
                 ></span>
           
            </div>
           
        </div>
        <ul v-show="toggle" class="submenu-box">        
            <slot></slot> 
        </ul>
    </div>
</template>
<script>
export default {
    name: 'SubMenu',
    data() {
        return {
            toggle: false
        }
        
    },
    methods: {
        handleToggle() {
            this.toggle = ! this.toggle
        }
    }
}
</script>
<style lang="less" scoped>
.submenu {
  &-had {
      position: relative;
      .icon {
          position: absolute;         
          right: 5px;
          
        width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #000;
      }
  }
  &-box {
        padding-left: 16px;    
  }
}

</style>>
