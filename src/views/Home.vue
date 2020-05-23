<template>
  <div class="home">
   vue-ui home

   <button @click="handleClick">dian</button>
   <div>
     <input v-model="username">
     <input v-model="password">
   </div>
   <button @click="handleClick2">dian</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {test,getUser} from '@/api/user'
export default {
  name: 'Home',
  data(){
    return{
      username:'',
      password:''
    }
  },
  components: {
    HelloWorld
  },
  methods:{
   handleClick(){
      test().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
        handleClick2(){
      getUser({username: this.username,password: this.password}).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
