<template>
    <div class = "connexion">
        <label for = 'email'>Email : </label>
        <input name = 'email' id = 'email' type = 'email' requiered = 'true' placeholder="Ex : maxime.bon@gmail.com" pattern="[A-Za-zëçéèà.]{3,20}[@][A-Za-zëçéèà]{3,20}.[.]com">

        <label for = 'password1'>Password : </label>
        <input name = 'password1' id = 'password1' type = 'password' requiered = 'true' placeholder="Ex : Fai8uuh5b">

        <input @click = "checkFormulaire()" id="submit" value="Se connecter"  type="submit">
    </div>
</template>

<script>
//const axios = require('axios').default;
import axios from '../customAxios';
export default {
    name : 'connect',
    methods : {
        /**
         * Vérifie que le formulaire est rempli correctement avant de l'envoyer au backend
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        checkFormulaire(){
            const mail = document.getElementById('email').value;
            const mailValid = /[A-Za-zëçéèà.]{3,20}[@][A-Za-zëçéèà]{3,20}.[.]com/;
            const password1 = document.getElementById('password1').value;
            if(mailValid.test(mail) == false){ 
                alert("Remplissez correctement le champ Adresse mail!!");
                return;
            }
            else if(password1 == null){ // mettre des paramettre de verification pour le mot de passe
                 alert("Remplissez correctement le password");
                 return;
            }
            
            axios
            .post( '/auth/login', { 
                email: mail, 
                password: password1
            })
            .then(reponse => { 
                console.log(reponse.data.userId)
                this.$router.push({ name: 'Application', params: {id : reponse.data.userId}})
                localStorage.setItem('token', reponse.data.token)
                
            });
        }
         
    }
    
}
</script>

<style scoped>
.connexion {
    margin : auto;
}
input{
     border-radius : 20px;
     background-color: rgb(255, 255, 255);
}
input:invalid{
    background-color: rgb(207, 47, 79);
}
input:valid{
    
    background-color: rgb(80, 250, 74);
}
#submit{
    background-color:  #1D2F90;
    color :  #F98B8B;
    font-size: 1em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    border-radius : 20px;
    padding: 8px 20px 5px 20px;
    margin-top: 2%;
    font-weight: bold;
}
#submit:hover{
    background-color:  #6b64f0;
}
@media screen and (min-width: 400px) and (max-width: 700px){
	.connexion{
        display : flex;
        flex-direction: column;
        margin-right: 5%;
        margin-left: 5%;
    }
}
@media screen and (min-width: 700px) and (max-width: 1000px){
	.connexion{
        display : flex;
        flex-direction: column;
        margin-right: 5%;
        margin-left: 5%;
    }
}
</style>
