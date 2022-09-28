import express,{Request,Response} from "express";
import dotenv from "dotenv";
import { request } from "http";
import { router } from "./routes/routes";
import mongoose,{ ConnectOptions } from "mongoose"

dotenv.config();
const app=express();

mongoose.connect(
    process.env.MONGODB_URL as string,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }as ConnectOptions,
    (err)=>{
        if(err) console.log(err) ;
        else console.log("mongdb is connected");
    }
);

app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use("/",router);

app.listen(process.env.PORT,() => {
    console.log(`Hare krsna , Server is running @ ${process.env.PORT}`);
})