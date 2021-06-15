
var axios = require("axios");
var axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api"
})

module.exports = axiosInstance;