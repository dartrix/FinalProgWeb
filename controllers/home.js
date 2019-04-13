
const ctrl = {}


ctrl.index = (req,res) =>{
    if(req.session.userid != null){
        res.render('index',{user:true})
    } else{
    res.render('index')
    }
}

ctrl.login = (req, res) => {

    if(req.session.userid != null){
        res.redirect('/')
    } else{
    res.render('login')
    }
    
}

ctrl.registrarse = (req,res) =>{

    if(req.session.userid != null){
        res.redirect('/')
    } else{
    res.render('registro')
    }
    
}

ctrl.crearContacto = (req,res) =>{
    if(req.session.userid != null){
        res.render('crearContacto')
    } else{
        res.sendStatus(401);
}
    }
    

ctrl.logout = (req, res) =>{
    delete req.session.userid;
    res.redirect('/login')
}

module.exports = ctrl;