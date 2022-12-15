import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import {ReceitaModel} from "../model/receita.model.js"
import { UserModel } from "../model/user.model.js";


const receitaRouter = express.Router()

receitaRouter.post("/" , isAuth, attachCurrentUser, async(req,res) => {
    try{
        const loggedInUser = req.currentUser
        const receita= await ReceitaModel.create({...req.body, criadoPor:loggedInUser._id });

        await UserModel.findOneAndUpdate(
            {_id:loggedInUser._id},
            {$push:{receita:receita._id}},
            {runValidators:true}
        )

        return res.status(201).json(receita)

    }
catch(err){
    console.log(err)
    return res.status(500).json(err)
}

} )


receitaRouter.get("/",isAuth, attachCurrentUser, async (req,res) => {
    try{
        const receita =await ReceitaModel.find({});

        return res.status(200).json(receita)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

receitaRouter.get("/:receitaId", isAuth,attachCurrentUser, async(req, res) =>{
    try{
        const {receitaId} = req.params
        const receita= await ReceitaModel.findOne({_id: receitaId}).populate("comentario");

        return res.status(200).json(receita)

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

receitaRouter.put("/receitaId", isAuth, attachCurrentUser, isAdmin, async (req,res)=>{
    try{const updateReceita = await ReceitaModel.findOneAndUpdate(
        {_id:req.params.receitaId},
        {...req.body},
        {new: true, runValidators:true},
        );

        return res.status(200).json(updateReceita)

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
}
})

receitaRouter.delete("/receitaId", isAuth,attachCurrentUser, isAdmin, async (req, res) => {
    try{
        const deletedReceita = await ReceitaModel.deleteOne({
            _id:req.params.receitaId
        })

        return res.status(200).json(deletedReceita)

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
}
})



export {receitaRouter}