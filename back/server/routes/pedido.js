const express = require('express');
const _ = require('underscore');
const Pedido = require('../models/pedido');
const app = express();

app.get('/pedido', (req, res) => {
    Pedido.find({ estado: true })
        .exec((err, pedidos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: pedidos.length,
                pedidos
            });
        });
});
app.post('/pedido', (req, res) => {
    let body = req.body;
    let pedido = new Pedido({
        usuario: body.usuario,
        producto: body.producto,
        cantidad: body.cantidad,
        fecha: body.fecha,
        estado: body.estado
    });

    pedido.save((err, pedDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            pedDB
        });
    });
});

app.put('/pedido/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [ 'usuario','producto','cantidad','fecha', 'estado']);
    Pedido.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, pedDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            pedDB
        });

    });
});


app.delete('/pedido/:id', (req, res) => {
    let id = req.params.id;
    Pedido.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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