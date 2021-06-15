require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const multer = require('multer');
const cors = require('cors');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();
app.use(express.json())
// app.use(cors())
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Disposition');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/profil', express.static(path.join(__dirname, 'profil')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;
