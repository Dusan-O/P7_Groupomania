<template>
    <div id = "connexion">
        <img alt = 'Groupomania logo' src = '../assets/icon-above-font.png' height="400" width="400">
        <Connect/>
    </div>
</template>

<script>
import Connect from '@/components/Connect.vue'
export default {
    name : 'connexion',
    components : {
        Connect
    }
    /*props: {
        msg: String
    }*/
}
</script>

<style scoped>
    #connexion{
        text-align: center;
    }
</style>