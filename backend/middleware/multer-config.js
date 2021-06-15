const multer = require('multer');

// Création du diskStorage de multer, il permet de définir notre configuration d'upload
// /!\ Créez les dossiers de destination au cas où avant l'upload
var storage = multer.diskStorage({
  // La limite en taille du fichier
  limits: {
    fileSize: 1000000, //1Mo
  },
  // La destination, ici ce sera à la racine dans le dossier img
  destination: function (req, file, cb) {
    cb(null, './image')
  },
  // Gestion des erreurs
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Le fichier doit etre un JPG'))
    }
    cb(undefined, true)
  },
  // Fonction qui renomme l'image
  filename: function (req, file, cb) {
    // Genère un nom aléatoire et récupère l'ancienne extension
    cb(
      null,
      Math.random().toString(36).substring(7) +
        '.' +
        file.originalname.split('.')[1],
    )
  },
})

// Création de l'objet multer
const upload = multer({
  storage: storage,
})

//const upload = multer({storage}).single('image');
module.exports =  upload.single('picture');