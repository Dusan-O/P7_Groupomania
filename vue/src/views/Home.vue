<template>
  <div class="home">
    <img alt="Vue logo" src = '../assets/icon-above-font.png' height="250" width="250">
    <HelloWorld msg="Bienvenue sur le reseau social de Groupomania"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
  .home{
    text-align: center;
  }
</style>