<template>
  <div id="app">
    <nav id="nav">
        
        <router-link to="/">Home</router-link> 
        <router-link to="/about">About</router-link>
        
      
        <router-link to="/inscription">Inscription</router-link>
        <router-link to="/connexion">Connexion</router-link>
      
      
    </nav>
    <router-view/>
  </div>
</template>

<script >
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #292626;
  
}
#nav {
  /*padding: 30px;*/
  background-color:  #1D2F90;
  /*margin-bottom: 2%;*/
  display: flex;
  justify-content: space-around;
}
/*.navContent {
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  
}*/
a{
  padding-top: 25px;
  padding-bottom: 25px;
  padding-right: 25px;
  padding-left: 25px;
}
a:hover{
  background-color: rgb(255, 255, 255);
}
body{
  margin: 0;
}
#nav a {
  font-weight: bold;
  color: #F98B8B;
}
#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
