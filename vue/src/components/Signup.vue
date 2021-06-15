<template>
    <div class = "inscription">
        <label for = "picture"> Photo de profil : </label>
         <img  id="blah" width="50" height="50" alt=""><br />
        <input type ='file' name = 'picture' id = 'picture' onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])"><br />

        <label for = 'prenom'>Prenom : </label>
        <input name = 'prenom' id = 'prenom' type = 'text' requiered = 'true' placeholder="Ex : Maxime" pattern = "[A-Za-zëçéàè-]{3,10}">
        
        <label for = 'nom'>Nom : </label>
        <input name = 'nom' id = 'nom' type = 'text' requiered = 'true' placeholder="Ex : Bon" pattern = "[A-Za-zëçéèà-]{3,15}">

        <label for = 'email'>Email : </label>
        <input name = 'email' id = 'email' type = 'email' requiered = 'true' placeholder="Ex : maxime.bon@gmail.com" pattern="[A-Za-zëçéèà.]{3,20}[@][A-Za-zëçéèà]{3,20}.[.](com|fr|net)">

        <label for = 'password1'>Password : </label>
        <input name = 'password1' id = 'password1' type = 'password' requiered = 'true' placeholder="Ex : Fai8uuh5b">

        <label for = 'password2'>Confirmation : </label>
        <input name = 'password2' id = 'password2' type = 'password' requiered = 'true' placeholder="Ex : Fai8uuh5b"><br />

        <input @click = "checkFormulaire()" id="submit" value="    S'inscrire   "  type="submit">
    </div>
</template>

<script>
import axios from '../customAxios';
export default {
    name : 'signup',
    methods : {
        /**
         * Vérifie que le formulaire est rempli correctement avant de l'envoyer au backend
         *
         * @param {void} aucun paramettre
         * 
         * @return  {void}
         */
        checkFormulaire(){
            var picture = document.getElementById('picture').files[0];
            const prenom = document.getElementById('prenom').value;
            const prenomValid = /[A-Za-zëçéèà]{3,10}/;
            const nom = document.getElementById('nom').value;
            const nomValid = /[A-Za-zëçéàè-]{3,15}/;
            const mail = document.getElementById('email').value;
            const mailValid = /[A-Za-zëçéèà.]{3,20}[@][A-Za-zëçéèà]{3,20}.[.]com/;
            const password1 = document.getElementById('password1').value;
            const password2 = document.getElementById('password2').value;
            if(prenomValid.test(prenom) == false){ 
                alert("Remplissez correctement le champ Prenom!!");
                return;
            }
            if(nomValid.test(nom) == false){
                alert("Remplissez correctement le champ Nom!!");
                return;
            }
            if(mailValid.test(mail) == false){ 
                alert("Remplissez correctement le champ Adresse mail!!");
                return;
            }
            else if(password1 != password2){
                 alert("Les mots de passe sont differents");
                 return;
            }
            var formData = new FormData();
            formData.append('picture', picture);
            formData.append('firstName', prenom);
            formData.append('lastName', nom);
            formData.append('email', mail);
            formData.append('password', password1);
            alert("utilisateur enregistré !");
            axios
            .post('/auth/signup', formData)
            .then(reponse => { console.log(reponse)
             this.$router.push({path : '/connexion'})
            
            });
        }
    }
}
</script>

<style scoped>
.inscription {
    margin : auto;
}
input{
    margin-right : 1%;
    border-radius : 20px;
}
input:invalid{
    background-color: rgb(207, 47, 79);
}
input:valid{
   background-color: rgb(255, 255, 255);
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
    background-color:  #4455b3;
}
#blah{
   margin:auto
}
@media screen and (min-width: 400px) and (max-width: 700px){
	.inscription{
        display : flex;
        flex-direction: column;
        margin-right: 5%;
        margin-left: 5%;
    }
}
@media screen and (min-width: 700px) and (max-width: 1000px){
	.inscription{
        display : flex;
        flex-direction: column;
        margin-right: 5%;
        margin-left: 5%;
    }
}
</style>