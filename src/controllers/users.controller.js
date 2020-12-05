const usersCtrl={};
const user=require("../models/user");
const passport = require("passport");
usersCtrl.renderSignUpForm =(req,res)=>{
    res.render("users/signup");
};

usersCtrl.signUp= async(req,res)=>{
    const owo=[];
    const{name, email, password, confirm_password}=req.body;
    if(password!=confirm_password){
        owo.push({text:"Las contraseñas no coinciden"});
    }
    if(password.length < 4){
        owo.push({text: "La contraseña debe tener más de 4 dígitos"})
    }

    if(owo.length > 0){
        res.render("users/signup",{ owo, name, email }); //acá le envio los errores al archivo, por eso en error.hbs puedo usar el owo
    }else{
        const emailuser= await user.findOne({email: email});
        if(emailuser){
            const error= req.flash("error_msg","Correo en uso");
            //creando la variable global
            //res.render("users/signup",{error, name,email});
            res.redirect("/users/signup");
            
        }else{
            const newUser= new user({name, email, password});
            newUser.password= await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("succes_msg","REGISTRO EXITOSO!");
            res.redirect("/users/signin");
        }
    }
    
};

usersCtrl.renderSignInForm =(req,res)=>{
    res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout=(req,res)=>{
    req.logout(); //funcion de passport
    req.flash("succes_msg", "Sesion cerrada!");
    res.redirect("/users/signin");
};




module.exports=usersCtrl;