const ctrl = {}

const user = require('../models/user');

ctrl.login = async (req, res) => {
    var post = req.body;
    var u = await user.findOne(post)

    console.log(u);
    if(u){
        req.session.userid = u._id;
        console.log(req.session.userid);
        res.redirect('/');
    }else{
        res.render('login',{error: true, msg: "No se pudo iniciar sesion. Usuario o contraseña incorrecto!"})
    }
    
}

ctrl.registrarse = async (req, res) => {
    var post = req.body;

    console.log(post);
    const findUser = await user.find({email: post.email})

    if(findUser.length <= 0){
        const nuevoUsuario = new user({
            email: post.email,
            password: post.password
        })
        const Usuario = await nuevoUsuario.save();
        res.render('login',{success:true, msg: "Usuario registrado correctamente. Favor iniciar sesion"})
    }
    else{
        res.render('registro',{error: true, msg:"Ya existe un usuario con este email"});
    }
}

module.exports = ctrl;