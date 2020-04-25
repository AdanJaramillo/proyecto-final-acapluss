const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;
let productoSchema = new Schema({
    img: {
        type: String,
        required: [true, 'Por favor ingresa la imagen']
    },
    nombre: { 
        type: String, 
        required: [true, 'Porfavor ingresa el nombre' ] 
    },
    codigo: { 
        type : String, 
        required: [true, 'Porfavor ingresa el codigo' ]
    },
    descripcion: { 
        type : String, 
        required: [true, 'Porfavor ingresa la descripcion'] 
    },
    
    estado: {
        type: Boolean,
        default: true
    }

});

productoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});


module.exports = mongoose.model('Producto', productoSchema);