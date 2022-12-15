import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { connectToDB } from "./config/db.config.js";
import { uploadImgRouter } from "./routes/uploadImage.routes.js";
import { userRouter } from "./routes/user.routes.js";
import {receitaRouter} from "./routes/receita.routes.js"
import {comentarioRouter} from "./routes/comentario.routes.js"



dotenv.config();
connectToDB();

const app = express();

app.use(cors());
app.use(express.json());

// const API_VERSION = "1.0";


app.use("/user", userRouter);
app.use("/receitas",receitaRouter)
app.use("/comentarios", comentarioRouter)
// app.use(`/api/${API_VERSION}/user`, userRouter);
// app.use(`/api/${API_VERSION}/uploadImage`, uploadImgRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
