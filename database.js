const mongoose = require('mongoose');

const mongourl = process.env.MONGO_URI;
const connectToMongo = ()=>{
    mongoose.connect(mongourl)
    .then(()=>{console.log("DB CONNECTED")})
    .catch((err)=>{console.log("error in DB" , err)})
}

module.exports = connectToMongo;