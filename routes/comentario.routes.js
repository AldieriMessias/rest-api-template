import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import {ComentarioModel} from "../model/comentario.model.js"
import { UserModel } from "../model/user.model.js";
import { ReceitaModel } from "../model/receita.model.js";

const comentarioRouter = express.Router()

comentarioRouter.post("/:receitaId/comentario" , isAuth, attachCurrentUser, async(req,res) => {
    try{
        const {receitaId} = req.params 
        const loggedInUser = req.currentUser
        const comentario= await ComentarioModel.create({...req.body, criadoPor:loggedInUser._id, receita:receitaId })


        await UserModel.findOneAndUpdate(
            {_id:loggedInUser._id},
            {$push:{comentario:comentario._id}},
            {runValidators:true}
        )

        await ReceitaModel.findOneAndUpdate(
            {_id:receitaId},
            {$push:{comentario:comentario._id}},
            {runValidators:true}
        )
        return res.status(201).json(comentario)
        

    }
catch(err){
    console.log(err)
    return res.status(500).json(err)
}

} )


comentarioRouter.get("/",isAuth, attachCurrentUser, async (req,res) => {
    try{
        const comentario =await ComentarioModel.find({});

        return res.status(200).json(comentario)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

comentarioRouter.get("/:comentarioId", isAuth,attachCurrentUser, async(req, res) =>{
    try{
        const comentario= await ComentarioModel.findOne({_id: req.params.comentarioId});

        return res.status(200).json(comentario)

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})



comentarioRouter.delete("/:comentarioId", isAuth,attachCurrentUser, isAdmin, async (req, res) => {
    try{
        const deletedComentario = await ComentarioModel.deleteOne({
            _id:req.params.comentarioId
        })

        return res.status(200).json(deletedComentario)

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
}
})



export {comentarioRouter}