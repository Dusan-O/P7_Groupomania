const Models = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Enregistre les coordonnées des utilisateurs
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */
exports.signup = async (req, res, next) => {
    await Models.sequelizes.sync();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        Models.User.create({
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            image : `${req.protocol}://${req.get('host')}/profil/${req.file.filename}`,
            email : req.body.email,
        }).then(reponse => res.status(201).json({ message : 'Objet enregistré !'}))
        .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
    });

    

    
};
/**
 * Vérifie que l'email et le mot de passe soit dans la base de données puis envoie une réponse
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */
exports.login = async (req, res, next) => {
    try {
        await Models.sequelizes.sync();
        const user = await Models.User.findAll({
            where: { email: req.body.email}
        })
        console.log('NuMERO 1', user);
        if (user.length == 0) throw ({ status: 400, msg: "element non trouvé" });
        console.log('NuMERO 3');
        console.log(user[0].dataValues.password);
        bcrypt.compare(req.body.password, user[0].dataValues.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({error : "Mot de passe incorrect !"});
            }
            res.status(200).json({
                userId : user[0].dataValues.id,
                token: jwt.sign(
                    {userId: user[0].dataValues.id},process.env.SECRET,{expiresIn: '24h'}
                ) 
            });
        })
        .catch(error => res.status(500).json({error}));
    }
    catch (e) {
        //gestion erreur
        console.error(e);
        res.status(e.status).json({ message: e.msg });
        console.log('NuMERO 2');
    };
};

/**
 * Supprime un utilisateur de la base de données
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */
exports.deleteUser = async (req, res, next) => {

    await Models.sequelizes.sync();
    let id = req.params.id;
    Models.User.destroy({
        where: {id: id}
    })
    .then(user =>{ 
        console.log(user);
        if(user == 1){
            res.status(201).json({ message : 'Objet supprimé !'});
        }
        else{
            res.status(400).json({message : "Objet non supprimé !"});
        }   
    }).catch(function (e) {
        //gestion erreur
        console.log(e);
        
    });

};

/**
 * Récupère un utilisateur de la base de données
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */

exports.getUser = async (req, res, next) => {
    
    await Models.sequelizes.sync();
    let id = req.params.id;
    console.log();
    Models.User.findAll({
        where: {id: id}
    })
    .then(user =>{ 
        console.log(user[0].dataValues);
        res.status(201).json({ message: user[0].dataValues });

    }).catch(function (e) {
        //gestion erreur
        console.log(e);
        res.status(400).json({message : "Utilisateur non récupéré !"})
    });
};