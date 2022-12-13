import {Schema, Types, model} from "mongoose"

const receitaSchema = new Schema({
    name:{type:String, required:true, trim:true},
    ingredientes:{type:String, required:true, trim:true},
    modoDePreparo:{type:String, required:true, trim:true},
    tempoDePreparo:{type:String, required:true, trim:true},
    criadoEm:{type:Date, default:new Date(Date.now())},
    criadoPor:{type: Types.ObjectId, ref:"User"},
    comentario:[{type: Types.ObjectId, ref:"Comentario"}]
}) 

export const ReceitaModel = model("Receita" , receitaSchema)