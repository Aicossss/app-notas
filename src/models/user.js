const{Schema,model}=require("mongoose");
const bcrypt= require("bcryptjs");
const UserSchema = new Schema({
    name:{type: String, required: true},
    email:{ type: String, required: true},
    password: { type: String, required: true}
},{timestamps:true});

//creando una funcion con mongoose
UserSchema.methods.encryptPassword = async password=>{
    const salt = await bcrypt.genSalt(10); //un string en que se basa para el cifrado

    return await bcrypt.hash(password,salt); //nos devuelve la contraseña cifrada
};

UserSchema.methods.matchPassword = async function(password) {
   return await bcrypt.compare(password,this.password);
   
};

module.exports= model("user", UserSchema);