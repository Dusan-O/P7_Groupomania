<template>
    <div >
        <div id="box-button">
            <label> ajouter un commentaire :
            <input type= "text" name ="comment"  id = "comment" placeholder="     _________________________________________________"/>
        </label>
            <input @click = "sendComment()" id="button" type="submit" value="Commenter">
            <p id="props" class="hidden">{{number}}</p>      
        </div>
        <button id="commentaires" @click= "masckComment()">Commentaires</button>

        <div :id=number class="bloc">
            <div id="commentZone" :key="index" v-for="(item, index) in commentaire">
                <p >{{commentaire[index].author}} : {{commentaire[index].text}}</p>
            </div>
        </div>
        

    </div>
</template>

<script>
    import axios from '../customAxios';
// import axios from 'axios';
//const axios = require('axios').default;
export default {
    name: 'comment',
    props : {
        number: {
            type: Number
        }
    },
    /**
         * Affiche les commentaires de chaque posts
         *
         * @param {void} aucun paramettre
         * 
         * @return  un objet avec les commentaires de chaque post
         */
    data(){
        console.log(this.number)
         const token = localStorage.getItem('token');
        return{
            commentaire : axios.get('/post', {
                                headers: {
                                    'Authorization': `token ${token}`
                                },
                                 params : { 
                                    postId : this.number 
                                }
                            })
                        .then(reponse => {this.commentaire = reponse.data.message ,console.log(reponse.data.message)})
        }
    },
    methods : {
        /**
         * Masque les commentaires de chaque posts
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        masckComment(){
            
            var commentZone = document.getElementById(this.number);
            console.log("now", this.number)
            
            if(getComputedStyle(commentZone).display != "none"){
                commentZone.style.display = "none";
            } 
            else {
                commentZone.style.display = "flex";
            }
            
        },
        /**
         * Récupère l'id d'un post
         *
         * @param {void} aucun paramettre
         * 
         * @return  retourne l'id d'un post
         */
        querySelect(){
            var inputs = document.querySelectorAll('input[type=text]'),
                i,
                len,
                byVal = [];
            for (i = 0, len = inputs.length; i < len; i++) {
                if (inputs[i].value !== "") {
                    byVal.push(inputs[i].value);
                }
            }
            
            return byVal[0]
            
        },
        /**
         * Envoie un commentaire
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        async sendComment(){
            this.masckComment()
            var commentaire = this.querySelect();
            var url = window.location.href;
            url = url.replace(/\/$/, "");
            var queue_url = url.substring (url.lastIndexOf( "/" )+1 );
             const token = localStorage.getItem('token');
            const reponse = await axios.get('/auth/'+ queue_url,  {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
            var user = reponse.data.message
            user = user.firstName + ' ' + user.lastName
            console.log(user)
            if(commentaire != undefined){
               axios
                .post('/post', 
               {
                    text: commentaire,
                    image: null,
                    author: user, 
                    ref: this.number
                }, 
                {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then(reponse => {console.log(reponse.data.message)})
                document.location.reload();
            }
            else{
                alert("champ commentaire vide");
            }
        }
    }
}
</script>

<style scoped>
label{
    font-size: 0px;
}
.bloc{
    display: none;
    flex-direction : column;
}
#commentZone{
    background-color: #7abff8;
    border-radius : 20px;
    margin-top: 2%;
    padding-bottom: 2%;
    padding-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 3%;
}
p{
    margin-left: 3%;
}
#box-button{  
    margin-bottom: 3%;
    margin-left: 5%;  
}
#button{
    background-color:  #1D2F90;
    color :  #ffffff;
    font-size: 1em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    border-radius : 20px;
    padding: 8px 12px 5px 12px;
    width: 24%;
}
#button:hover{
    background-color:  #5a6ac4;
}
#comment{
    background-color: #7abff8;
    border-radius : 20px;
    /*font-size: 1.4em;*/
    width: 70%;
    height: 30px;
}
/* #props{
    font-size: 1px;
} */
.hidden {
    display: none;
}
#commentaires{
    background-color:  #1D2F90;
    color :  #F98B8B;
    font-weight: bold;
    font-size: 1em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    border-radius : 20px;
    padding: 8px 12px 5px 12px;
    width: 24%;
    margin-left: 35%;
    margin-bottom: 3%;
}
#commentaires:hover{
    background-color:  #5a6ac4;
}
@media screen and (min-width: 400px) and (max-width: 700px){
	#comment{
        
        /*font-size: 1.4em;*/
        width: 66%;
        height: 11px;
    }
    #button{
        font-size: 12px;
        padding: 2px 6px 0px 6px;
        width: 28%;
    }
    #commentaires{
        font-size: 12px;
        padding: 4px 6px 3px 6px;
        width: 28%;
        margin-left: 35%;
        margin-bottom: 3%;
    }
    #commentZone{
        margin-top: 2%;
        padding-bottom: 1%;
        padding-top: 1%;
        margin-left: 5%;
        margin-right: 5%;
        margin-bottom: 3%;
    }
    #commentZone p{
        font-size: 15px;
    }
}
@media screen and (min-width: 700px) and (max-width: 1000px){
	
}
</style>