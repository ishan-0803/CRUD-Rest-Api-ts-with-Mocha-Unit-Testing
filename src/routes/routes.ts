import express,{Request,Response} from "express";
import { Todo } from "../models/todo.model";

const router=express.Router();

// router.get("/",(req : Request,res : Response) =>{
//     res.json({
//         message : "Hare krsna, API is working by lord's grace",
//     });
// });

// router.get("/about",(req: Request,res: Response) => {
//     res.json({
//         data : "This is Krsna's about page. HARIBOL!",
//     })
// });

// router.get("/profile",(req: Request,res: Response) => {
//     res.json({
//         data : "This is Krsna's profile page. HARIBOL!",
//     })
// });

// insert
router.post("/add",async(req:Request, res: Response)=>{
    const {title,description}=req.body;

    const item=Todo.set({title,description});

    await item.save();

    return res.status(200).json({
        data: item,
    })
});

// Get all
router.get("/",async(req:Request, res: Response)=>{

    try{

        // let {page:string,size:String} = req.body;
        // if(!page){
        //     page=1;
        // }
        // if(!size){
        //     size=10;
        // }

        var pageNo = parseInt(req.query.pageNo as string)
        var size = parseInt(req.query.size as string)
        if(!pageNo){
            pageNo=1
        } 
        if(!size){
            size=10
        }
        // var query = {
        //     skip: number,
        //     limit: number,
        // }
        if(pageNo < 0 || pageNo === 0) {
            var response={};
            response = {"error" : true,"message" : "invalid page number, should start with 1"};
            return res.json(response)
        }
        // query.skip = size * (pageNo - 1)
        // query.limit= size
        const item = await Todo.find({}).limit(size).skip(size * (pageNo - 1));

        return res.status(200).json({
            pageNo,
            size,
            data: item
        });
    }
    catch(error){
        return res.status(500).json({
            error:error,
        });
    }
});

//Get one doc
router.get("/:_id",async(req:Request, res: Response)=>{

    try{
        const item = await Todo.findById(req.params._id);

        return res.status(200).json({
            data: item
        });
    }
    catch(error){
        return res.status(500).json({
            error:error,
        });
    }
});

//Update Document
router.put("/update",async(req: Request, res: Response)=>{

    try{
        const filter = {
            title : req.body.title,
        };

        const update={
            description: req.body.description,
        };

        const item = await Todo.updateOne(filter,update,{
            new:true,
        });

        return res.status(200).json({
            data: item
        });
    }
    catch(error){
        return res.status(500).json({
            error: error,
        });
    }
});

// Delete Document
router.delete("/delete",async(req:Request, res: Response)=>{

    try{

        const filter = {
            title : req.body.title
        }

        const item = await Todo.updateOne(filter).then((data)=>res.json({
            data:data
        })).catch((e) => {
            console.log(e);
        });
    }
    catch(error){
        return res.status(500).json({
            error:error,
        });
    }
});

export{router};
