const mongoose = require('mongoose');

const connectToMongo=()=>{
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("connected to mongo");
    } catch (error) {
        console.log(`Error occureed while conecting`)
    }
}

module.exports= connectToMongo