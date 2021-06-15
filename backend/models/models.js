const { INTEGER, DATE, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const sequelizes = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    login: false

});

var exports = module.exports = {};
exports.sequelizes = sequelizes;

/*
    USER
*/
const User = sequelizes.define('user', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    firstName : {type: sequelize.STRING(15), allowNull: false},
    lastName: {type: sequelize.STRING(25), allowNull: false},
    email: {type: sequelize.STRING(40), allowNull: false, unique: true},
    image: {type: sequelize.STRING(255), allowNull: true},
    password: {type: sequelize.STRING(65), allowNull: false}
},
    {tableName: 'user', timestamps: false, underscored: true}
);

exports.User = User;

/*
    POST
*/
const Post = sequelizes.define('post', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true, unique: true},
    text: {type: sequelize.TEXT, allowNull: true},
    image: {type: sequelize.STRING(255), allowNull: true},
    author: {type: sequelize.STRING(40)},
    date: {type: DATE, defaultValue: DataTypes.NOW},// creer automatique la date du jour
    ref: {type: INTEGER, allowNull: true}
},
    {tableName: 'post', timestamps: false, underscored: true}
);

exports.Post = Post;

User.hasMany(Post);
Post.belongsTo(User);

sequelizes.sync({logging: console.log});