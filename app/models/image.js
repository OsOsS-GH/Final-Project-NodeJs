const mongoose = require('mongoose');

//Define Product Schema
const imageSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId ,
    title : {type : String , required : true}
} ,
{
    timestamps : true
}

);

module.exports = mongoose.model('Image' , imageSchema);