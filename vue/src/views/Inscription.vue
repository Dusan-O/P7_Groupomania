<template>
    <div id = "signup">
        <img alt = 'Groupomania logo' src = '../assets/icon-above-font.png' height="400" width="400">
        <Signup/>
    </div>
</template>

<script>
import Signup from '@/components/Signup.vue'
export default {
    name : 'inscription',
    components : {
        Signup
    }
    /*props: {
        msg: String
    }*/
}
</script>

<style scoped>
    #signup{
        text-align: center;
    }
</style>