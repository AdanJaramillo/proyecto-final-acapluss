const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario'); //subir nivel
const app = express();

const jwt = require('jsonwebtoken');


app.get('/usuario', (req, res) => {

    Usuario.find({ estado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, usuarios) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.usuario);
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        });
});

app.post('/registrar', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        //para poder mandar los datos a la coleccion
        strNombre: body.strNombre,
        strCorreo: body.strCorreo,
        strPassword: bcrypt.hashSync(body.strPassword, 10), //numero de veces de encriptar
        strApellidoPat: body.strApellidoPat,
        strApellidoMat: body.strApellidoMat,
        strRol: body.strRol, 
        blnEstado: body.blnEstado
    });

    usuario.save((err, usrDB) => {
        if (err) {
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


app.post('/registro', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        //para poder mandar los datos a la coleccion
        strNombre: body.strNombre,
        strCorreo: body.strCorreo,
        strPassword: bcrypt.hashSync(body.strPassword, 10), //numero de veces de encriptar
        strApellidoPat: body.strApellidoPat,
        strApellidoMat: body.strApellidoMat,
        strRol: body.strRol, 
        blnEstado: body.blnEstado
    });

    usuario.save((err, usrDB) => {
        if (err) {
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


app.put('/usuario/:id',(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strNombre', 'strCorreo', 'strPassword', 'strEstado', 'strRol']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
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

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, { strEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ strCorreo: body.strCorreo }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usrDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrecta o el usuario no tiene permisos'
                }
            });
        }

        if (!bcrypt.compareSync(body.strPassword, usrDB.strPassword)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrecta o el usuario no tiene permisos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usrDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.status(200).json({
            ok: true,
            usuario: usrDB,
            token
        });
    });
});

module.exports = app;