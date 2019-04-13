const ctrl = {}

const contacto = require('../models/contactos');

const nodemailer = require('nodemailer')

const emailconf = require('../emailconfig.json');

//create
ctrl.create = async (req, res) => {

    if (req.session.userid != null) {
        var datos = req.body;

        const nuevoContacto = new contacto({
            nombre: datos.nombre,
            telefono: datos.telefono,
            email: datos.email,
            UserId: req.session.userid
        })
        const save = await nuevoContacto.save();
        res.redirect('/contacto/' + save._id);
    } else {
        res.redirect('/login');
    }


}

//read
ctrl.read = async (req, res) => {
    if (req.session.userid != null) {
        var id = req.params.id;
        var user = req.session.userid;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var cont = await contacto.findOne({
                _id: id,
                UserId: user
            })


            if (cont) {
                res.render('mostrarContacto', {
                    error: false,
                    datos: cont
                })
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }
}

ctrl.buscar = async (req, res) => {
    if (req.session.userid != null) {
        var buscar = req.body.buscar;
        var user = req.session.userid;

        var cont;
        if (buscar.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            cont = await contacto.find({
                email: buscar,
                UserId: user
            })
        } else if (buscar.match(/^[0-9]*$/)) {
            cont = await contacto.find({
                telefono: buscar,
                UserId: user
            })
        } else {
            cont = await contacto.find({
                nombre: {
                    '$regex': buscar,
                    $options: 'i'
                },
                UserId: user
            })
        }

        res.render('index', {
            user: true,
            buscar: true,
            datos: cont
        })


    } else {
        res.redirect('/login');
    }
}


//update
ctrl.update = async (req, res) => {
    if (req.session.userid != null) {
        var datos = req.body;
        var id = req.params.id
        var user = req.session.userid;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var con = await contacto.findOne({
                _id: id,
                UserId: user
            });
            if (con) {
                con.nombre = datos.nombre;
                con.email = datos.email;
                con.telefono = datos.telefono;
                await con.save();
                res.redirect('/contacto/' + con._id);
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }
}
ctrl.updateGet = async (req, res) => {
    if (req.session.userid != null) {
        var id = req.params.id;
        var user = req.session.userid;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var cont = await contacto.findOne({
                _id: id,
                UserId: user
            })


            if (cont) {
                res.render('updateContacto', {
                    error: false,
                    datos: cont
                })
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }
}

//delete
ctrl.delete = async (req, res) => {
    if (req.session.userid != null) {
        var id = req.params.id;
        var user = req.session.userid;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var cont = await contacto.deleteOne({
                _id: id,
                UserId: user
            })


            if (cont) {
                res.redirect('/')
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }
}
ctrl.deleteGet = async (req, res) => {
    if (req.session.userid != null) {
        var id = req.params.id;
        var user = req.session.userid;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var cont = await contacto.findOne({
                _id: id,
                UserId: user
            })


            if (cont) {
                res.render('borrarContacto', {
                    borrado: false,
                    datos: cont
                })
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }
}


ctrl.index = async (req, res) => {
    if (req.session.userid != null) {
        var user = req.session.userid;

        var cont = await contacto.find({
            UserId: user
        })

        if (cont) {
            res.render('index', {
                user: true,
                datos: cont
            })
        } else {
            res.sendStatus(404)
        }

    } else {
        res.render('index', {
            user: false
        });
    }
}

ctrl.enviarEmail = async (req, res) => {
    if (req.session.userid != null) {
        var datos = req.body;
        var id = req.params.id;
        var user = req.session.userid;



        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var cont = await contacto.findOne({
                _id: id,
                UserId: user
            })

            
            let transporter = nodemailer.createTransport({
                host: emailconf.host,
                port: emailconf.port,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: emailconf.user, 
                    pass: emailconf.password 
                }
            })

            let info = await transporter.sendMail({
                from: '"Final Web" <finaldeweb2019@gmail.com>', // sender address
                to: cont.email, // list of receivers
                subject: datos.titulo, // Subject line
                text: datos.mensaje // plain text body
            });


            if (cont && info) {
                console.log(info)
                res.render('enviadoEmail', {
                    success: true,
                    email: cont.email
                })
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }
}

ctrl.email = async (req, res) => {

    if (req.session.userid != null) {
        var id = req.params.id;
        var user = req.session.userid;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var cont = await contacto.findOne({
                _id: id,
                UserId: user
            })


            if (cont) {
                res.render('enviarEmail', {
                    error: false,
                    datos: cont
                })
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }

    } else {
        res.redirect('/login');
    }

}
module.exports = ctrl;