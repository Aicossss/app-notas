const helpers={};

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){ //funcion de passport
        
        return next();
    }
    req.flash("error_msg", "No autorizado");
    res.redirect("/users/signin");
    
}

module.exports= helpers;