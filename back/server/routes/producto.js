const express = require('express');
const _ = require('underscore');
const Producto = require('../models/producto'); 
const app = express();

app.get('/producto', (req, res) => {

    Producto.find({ estado: true }) 
        
        .exec((err, productos) => { 
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.producto);
            return res.status(200).json({
                ok: true,
                count: productos.length,
                productos
            });
        });
});
app.post('/producto', (req, res) => {
    let body = req.body;
    let producto = new Producto({
        img: body.img,
        nombre: body.nombre,
        codigo: body.codigo,
        descripcion: body.descripcion,
        estado: body.estado,
    });

    producto.save((err, produDB) => {
        if (err) {
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

app.put('/producto/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['img', 'nombre', 'codigo', 'descripcion', 'estado']);
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, produDB) => {
        if (err) {
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
app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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

module.exports = app;