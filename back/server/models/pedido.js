const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Producto = require('./producto');
const Usuario = require('./usuario');


let Schema = mongoose.Schema;

let pedidoSchema = new Schema({
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    producto:{
         type: Schema.Types.ObjectId,
         ref: 'Producto',
         required: [true, 'Por favor ingrese el producto']
    },
    cantidad:{
        type: Number,
        required: [true, 'Por favor ingresa la cantidad']

    },
    fecha: {
        type: String,
        required: [true, 'Por favor ingresa la fecha']
    },
    estado:{
        type:Boolean,
        default:true
    }
});

pedidoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Pedido', pedidoSchema);