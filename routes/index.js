const express = require('express');

const router = express.Router();

const home = require('../controllers/home');
const user = require('../controllers/userController');
const contacto = require('../controllers/contactoController');

const {auth} = require('../helpers/helper');

module.exports = app => {
    
    router.get('/', contacto.index)

    //registrarse
    router.get('/registrarse', home.registrarse);
    router.post('/registrarse', user.registrarse);

    //login
    router.get('/login',home.login);
    router.post('/login',user.login);

    //logout
    router.get('/logout',home.logout);

    //contacto
    router.get('/contacto', contacto.index)
    router.get('/contacto/crear',home.crearContacto)
    router.get('/contacto/:id/update', contacto.updateGet)
    router.get('/contacto/:id/delete', contacto.deleteGet)
        //create
    router.post('/contacto/crear',contacto.create)
        //read
    router.get('/contacto/:id', contacto.read)
        //update
    router.post('/contacto/:id/update', contacto.update)
        //delete
    router.post('/contacto/:id/delete', contacto.delete)

        //buscar
    router.post('/contacto/buscar', contacto.buscar)
        //enviarMail
    router.get('/contacto/:id/mail', contacto.email)
    router.post('/contacto/:id/mail', contacto.enviarEmail)


    


    app.use(router)
}