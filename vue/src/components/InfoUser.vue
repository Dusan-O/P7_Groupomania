<template>
    <div id="infoUser">
          <img :src= nom.image  height="45" width="45" id = "image" alt="">
          <p>{{nom.firstName}} {{nom.lastName}}</p>
          <p>{{nom.email}}</p>
          <button @click= "deleteUser()">Suprrimer Utlisateur</button>
          <button @click= "deconnexion()">Deconnexion</button>
    </div>
</template>

<script>
//const axios = require('axios').default;
import axios from '../customAxios';
export default {
    name : 'infoUser',
    /**
         * Affiche les informations de l'utilisateur (nom, prenom, etc...)
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
                    })
                .then(reponse => {
                  this.nom = reponse.data.message, 
                  console.log(reponse)
                })
      }
    },
    methods: {
        /**
         * Suppression de l'utilisateur et de ses commentaires
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        deleteUser(){
            const token = localStorage.getItem('token');
            axios.delete('/post', {
                            headers: {
                                'Authorization': `token ${token}`
                            },
                        
                            data : {
                                author : this.nom.firstName +' '+ this.nom.lastName, 
                                userId : this.queue_url
                                }
                        })
            .then(response => {
                console.log(response.data.message);
            })
            axios.delete('/auth/'+this.nom.id, {
                            headers: {
                                'Authorization': `token ${token}`
                            }, 
                           
                            data : {
                                userId : this.queue_url
                            }
                        })
            .then(response => {
                console.log(response.data.message);
                localStorage.clear();
                this.$router.push({path : '/connexion'})
            })
        },
        /**
         * deconnection de la plateforme
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        deconnexion(){
            localStorage.clear();
            this.$router.push({path : '/connexion'})
            
        }
    }
}
</script>



<style scoped>
  #infoUser{
    background-color:#ff9595;
    display: flex;
    width: 100%;
    padding-top: 5px;
}
#infoUser p{
    color: #1D2F90;
    font-weight: bold;
    margin-right: 1%;
}
#image{
    border-radius: 100px;
    margin-left: 3%;
    margin-right: 2%;
}
</style>
