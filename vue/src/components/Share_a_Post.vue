<template>
    <div id = "post">
        
        <label for = "picture"> image </label>
        <img  id="blah" width="50" height="50" alt=""><br />
        <input type ='file' name = 'file' id = 'picture' onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])"><br />

        <label for = 'article'> Article </label><br />
        <textarea name = 'article' id = 'article' rows = '10' cols = '40' placeholder="Vous pouvez ecrire un article"></textarea>
        <input @click = "sendFormulaire()" type="submit" value="Envoyer" />
    </div>
</template>

<script>
// const axios = require('axios').default;
import axios from '../customAxios';
 export default {
    name : 'share_a_popst',
    methods: {
        /**
         * Envoie le post de l'utilisateur (image, gif, article) au backend
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        async sendFormulaire(){
            var url = window.location.href;
            url = url.replace(/\/$/, "");
            var queue_url = url.substring (url.lastIndexOf( "/" )+1 );
            const userId = queue_url;
            const token = localStorage.getItem('token');
            const reponse = await axios.get('/auth/'+ queue_url, {
                            headers: {
                                'Authorization': `token ${token}`
                            }
                        })
            var user = reponse.data.message
            user = user.firstName + ' ' + user.lastName
            
            var picture = document.getElementById('picture').files[0];
            const article = document.getElementById('article').value;
           
            var formData = new FormData();
            formData.append('picture', picture);
            formData.append('text', article);
            formData.append('author', user);
            formData.append('userId', userId);
           /* if(article == null){ 
                alert("Ecriver un article ou poster une image !!");
                return;
            }*/
            axios
            .post('/post', formData,{
                            headers: {
                                'Authorization': `token ${token}`
                            }
                        })
            .then(reponse => { console.log(reponse)});
            document.location.reload();
        }
    }
    
    
}
</script>

<style scoped>
#post{
    border: 3px  #9575CD solid;
    box-shadow: 0px 0px 10px;
    margin-left : 25%;
    margin-right : 25%;
    text-align: center;
    margin-top: 5%;
}
button{
    font-size: 2em;
}
@media screen and (min-width: 400px) and (max-width: 800px){
	#post{
        margin-left : 10%;
        margin-right : 10%;
        margin-top: 5%;
    }
}
@media screen and (min-width: 1000px) and (max-width: 1320px){
	#post{
        margin-left : 15%;
        margin-right : 15%;
    }
}
</style>