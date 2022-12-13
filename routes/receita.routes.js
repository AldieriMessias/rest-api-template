import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import {ReceitaModel} from "../model/receita.model.js"

const receitaRouter = express.Router()

receitaRouter.post("/" , isAuth, attachCurrentUser, async(req,res) => {
    try{
        const loggedInUser = req.currentUser
        const receita= await ReceitaModel.create({...req.body, criadoPor:loggedInUser._id })

        return res.status(201).json(receita)

    }
catch(err){
    console.log(err)
    return res.status(500).json(err)
}

} )


export {receitaRouter}