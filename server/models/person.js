var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Person = new Schema({
    name: String,
    lastName: String,
    email: String,
    seatId: String
});


module.exports = mongoose.model('Person', Person);