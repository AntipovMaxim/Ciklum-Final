var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Seat = new Schema({
    title: String,
    status: String,
    occupantId: String,
    occupant: String,
    x: Number,
    y: Number
});


module.exports = mongoose.model('Seat', Seat);