// Create the Mongoose model for location object
var mongoose = require('mongoose');
var locationSchema = new mongoose.Schema({
    place_id: String,
    state: String,
    city: String,
    visitCount: {type:Number, default: 0}
});
module.exports = mongoose.model('location', locationSchema);