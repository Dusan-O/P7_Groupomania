<template>
    <div >
        <div :key="index" v-for="(item, index) in post" >
            <div id ="posts" v-if= "post[index].ref == null">
                <div id="user">
                    <img :src= nom.image  height="50" width="50" id = "image" alt="">
                    <p id = "author">{{post[index].author}}</p>
                    <p>{{post[index].date}}</p>
                </div>
                <br />
                <div id = "textImage">
                    <h1>{{post[index].text}}</h1>
                    <img :src= post[index].image id="img" alt="">
                </div>
                <Comment :number = post[index].id />
          </div>
        </div>
    </div>
</template>

<script>
//const axios = require('axios').default;
import Comment from '@/components/Comment.vue'
import axios from '../customAxios';

export default {
    name: 'posts',
    components : {
        Comment,
    },
    /**
         * Affiche les posts partagés et les commentaires des utilisateurs
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
    data() {
        var url = window.location.href;
        url = url.replace(/\/$/, "");
        var queue_url = url.substring (url.lastIndexOf( "/" )+1 );
        const token = localStorage.getItem('token');
        return{
            nom : axios.get('/auth/'+ queue_url, {
                        headers: {
                            'Authorization': `token ${token}`
                        }
                    }).then(reponse => {this.nom = reponse.data.message, console.log(reponse)}),
            post: axios
                    .get('/post',{
                        headers: {
                            'Authorization': `token ${token}`
                        }
                    })
                    .then(reponse => {this.post = reponse.data.message.slice().reverse(),console.log(reponse)})
            
        }
    }
}
</script>

<style scoped>
#posts{
    border: 1px #CFD8DC solid;
    border-radius : 10px;
    box-shadow: 0px 0px 10px  #92989b;
    margin-top : 3%;
    margin-left : 25%;
    margin-right : 25%;
}
#image{
    border-radius: 100px;
    margin-top: 3%;
    margin-left: 5%;
}
img { 
    max-width: 100%;
}
#user{
    display: flex;
}
#textImage{
    border-bottom: 3px #CFD8DC solid;
    margin-bottom: 3%;
    margin-left: 5%;
    margin-right: 5%;
}
#author{
    margin-right: 3%;
}
@media screen and (min-width: 400px) and (max-width: 800px){
	#posts{
       
        /*margin-top : 3%;*/
        margin-left : 10%;
        margin-right : 10%;
    }
}
@media screen and (min-width: 1000px) and (max-width: 1320px){
	#posts{
        margin-left : 15%;
        margin-right : 15%;
    }
}
</style>