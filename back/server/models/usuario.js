const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre']

    },
    strCorreo: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el email']
    },
    strPassword: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']
    },
    strApellidoPat: {
        type: String,
        required: [true, 'Por favor ingresa tu apellido paterno']

    },
    strApellidoMat: {
        type: String,
        required: [true, 'Por favor ingresa tu apellido materno']
    },
    strRol: {
        type: String,
        default: 'USER_ROLE',
    },
    
    blnEstado: {
        type: Boolean,
        default: true
    }
   
});
//el esquema utilize el plugin
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Usuario', usuarioSchema);