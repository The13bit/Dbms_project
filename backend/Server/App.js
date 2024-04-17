import  express  from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/Error.js";
//routes import
import prjectRoue from './Routes/project_route.js'







config({
    path:"./Config/config.env"
})

const app=express();

//middleware
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:3000"})); //change to frontend address
app.use(cookieParser());


//routes

app.use("/api/v1",prjectRoue);


export default app;

app.use(ErrorMiddleware)