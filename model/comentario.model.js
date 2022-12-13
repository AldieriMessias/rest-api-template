import {Schema, Types, model} from "mongoose"

const comentarioSchema = new Schema({
    comentario:{type:String, required:true, trim:true},
    criadoEm:{type:Date, default:new Date(Date.now())},
    criadoPor:{type: Types.ObjectId, ref:"User"},
    receita:{type:Types.ObjectId, ref:"Receita"}
})

export const ComentarioModel = model("Comentario" , receitaSchema)