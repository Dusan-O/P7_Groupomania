<template>

    <div >
        <InfoUser />
        <SharePost />
        <Posts/>
    </div>
</template>

<script>
import SharePost from '@/components/Share_a_Post.vue'
import Posts from '@/components/Posts.vue'
import InfoUser from '@/components/InfoUser.vue'
export default {
    name : 'application',
    components : {
        SharePost,
        Posts,
        InfoUser
    },
    beforeMount : function(){
        const data = localStorage.getItem("token");
        if(data === null){
           this.$router.push({path : '/connexion'})
        }
    }
}
</script>

<style scoped>
</style>