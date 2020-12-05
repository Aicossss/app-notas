const{Schema,model}= require("mongoose");

const NoteSchema= new Schema({
    tittle: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },

},{
    timestamps: true
    //nos da cuando fue creado y actualizado por ultima vez
})

module.exports=model("Note", NoteSchema);