const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

//const path = require('path')

const ContactoSchema = new Schema({
    nombre: {type: String},
    telefono: {type: String},
    email: {type: String},
    UserId: {type: ObjectId}
})

module.exports = mongoose.model('Contacto', ContactoSchema);