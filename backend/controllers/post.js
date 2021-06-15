const Models = require('../models/models');
const fs = require('fs');
const { Op } = require("sequelize");

/**
 * Enregistre les posts dans la base de données
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */
exports.post = async (req, res, next) => {
   
    console.log(req.body)
    await Models.sequelizes.sync();

   if(req.file == undefined){
       if(req.body.ref == null){
            Models.Post.create({
                text: req.body.text, 
                image: null,
                author: req.body.author, 
                ref: null,
                user_id: 7 
            })
            .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
            .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
       }
       else{
        Models.Post.create({
            text: req.body.text, 
            image: null,
            author: req.body.author, 
            ref: req.body.ref,
            user_id: 7 
        })
        .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
        .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
       }
        
    }
    else{
        if(req.body.ref == null){
            Models.Post.create({
                text: req.body.text, 
                image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`, 
                author: req.body.author, 
                ref: null,
                user_id: 7 
            })
            .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
            .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
        }
        else{
            Models.Post.create({
                text: req.body.text, 
                image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`, 
                author: req.body.author, 
                ref: req.body.ref,
                user_id: 7 
            })
            .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
            .catch(error => {console.log(error); res.status(400).json({message : "Objet non enregistré !"})});
        }
    }  
};
/**
 * Récupère les posts des utilisateurs dans la base de données
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */
exports.getPost = async (req, res, next) => {
    if(req.query.postId == undefined){
        await Models.sequelizes.sync();
        Models.Post.findAll()
            .then(posts => {
                console.log("ligne 36");
                res.status(201).json({ message: posts })
                posts.forEach((post) => {
                    console.log(post.dataValues);

                })
            }).catch(function (e) {
                //gestion erreur
                console.log(e);
            });
    }
    else{
        await Models.sequelizes.sync();
        Models.Post.findAll({
            where: {
                ref: req.query.postId}
            })
                
            .then(posts => {
                console.log("ligne 37");
                res.status(201).json({ message: posts })
                posts.forEach((post) => {
                    console.log(post.dataValues);

                })
            }).catch(function (e) {
                //gestion erreur
                console.log(e);
        });
    }
    

};



/**
 * Supprime les posts dans la base de données
 *
 * @param {void} aucun paramettre
 * 
 * @return  {void}
 */

exports.deletePost = async (req, res, next) => {

    console.log(req.body.author)
    await Models.sequelizes.sync();

    Models.Post.findAll({where: {author: req.body.author}})
    .then(post =>{ 
        if(post[0].dataValues.image != null){
            const filename = post[0].dataValues.image.split('/image/')[1];
            fs.unlink(`image/${filename}`,() => {
                Models.Post.destroy({where: {author: req.body.author}})
                .then(() => res.status(201).json({ message: 'Objet supprimé !!!'}))
                .catch(error => res.status(400).json({error}));
            });
        }
        else{
            Models.Post.destroy({where: {author: req.body.author}})
            .then(() => res.status(201).json({ message: 'Objet supprimé pour de bon!!!'}))
            .catch(error => res.status(400).json({error}));
        }
        
    })
    .catch(function (e) {
        //gestion erreur
        console.log(e);
    });
};