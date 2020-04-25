const express = require('express');
const fileUpload = require('express-fileupload');
const { verificaToken } = require('../middlewares/autenticacion');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

const Usuario = require('../models/usuario');
const Libro = require('../models/producto');

app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) =>{
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name); 

    if (!req.files) {
        return res.status(400).json({
            ok: false, 
            err:{
                message: 'No se a seleccionado ningun archivo'
            }
        })
    }

    let validExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    if (!validExtensions.includes(archivo.mimetype)) { 
        return res.status(400).json({
            ok: false, 
            err: {
                message: 'Solo las extensiones <png, jpg, gif, jpeg> son validas'
            }
        });    
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) =>{ 
        if (err) {
            return res.status(500).json({
                ok: false, 
                err
            });
        }
    });
 
    switch(ruta){  
        case 'producto':
            imagenProducto(id, res, nombre)
        break;

        case 'usuario':
            imagenUsuario(id, res, nombre);
        break;
        default: 
        return res.status(400).json({
            ok: false, 
            err: {
                message: 'Ruta no valida'
            }
        });
        break;
    }   

});

function imagenUsuario(id, res, nombreImagen){  
    Usuario.findById(id, (err, usr)=>{
        if (err) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usr) {
            borrarArchivo(nombreImagen, 'usuario');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario no existe'
                }
            }); 
        }
        usr.img = nombreImagen;

        usr.save((err, usrDB)=>{
            if (err) {
                borrarArchivo(nombreImagen, 'usuario');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true, 
                usrDB
            });
        });

    });
}

function imagenProducto(id, res, nombreImagen){  
    Libro.findById(id, (err, prod)=>{
        if (err) {
            borrarArchivo(nombreImagen, 'producto');
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!prod) {
            borrarArchivo(nombreImagen, 'producto');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Producto no existe'
                }
            }); 
        }
        prod.img = nombreImagen;

        prod.save((err, produDB)=>{
            if (err) {
                borrarArchivo(nombreImagen, 'libro');
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true, 
                produDB
            });
        });

    });
}

function borrarArchivo(nombreImagen, ruta){
    let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`); 
    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);

    }
    console.log('Imagen borrada con exito');
}

module.exports = app;