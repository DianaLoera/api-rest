const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) { //valida errores de sintaxis
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) { //valida si esta bien la sintaxis, si realmente existen usuarios con esos
            return res.status(400).json({
                ok: false,
                err: {
                    message: '*Usuario y/o contraseña incorrectos'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o *contraseña incorrectos'
                }
            });
        }

        return res.status(200).json({ //si las dos cocntraseñas son correctas
            ok: true,
            usuario: usuarioDB,


        });

    });
});

module.exports = app;