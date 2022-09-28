"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const todo_model_1 = require("../models/todo.model");
const router = express_1.default.Router();
exports.router = router;
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
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const item = todo_model_1.Todo.set({ title, description });
    yield item.save();
    return res.status(200).json({
        data: item,
    });
}));
// Get all
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let {page:string,size:String} = req.body;
        // if(!page){
        //     page=1;
        // }
        // if(!size){
        //     size=10;
        // }
        var pageNo = parseInt(req.query.pageNo);
        var size = parseInt(req.query.size);
        if (!pageNo) {
            pageNo = 1;
        }
        if (!size) {
            size = 10;
        }
        // var query = {
        //     skip: number,
        //     limit: number,
        // }
        if (pageNo < 0 || pageNo === 0) {
            var response = {};
            response = { "error": true, "message": "invalid page number, should start with 1" };
            return res.json(response);
        }
        // query.skip = size * (pageNo - 1)
        // query.limit= size
        const item = yield todo_model_1.Todo.find({}).limit(size).skip(size * (pageNo - 1));
        return res.status(200).json({
            pageNo,
            size,
            data: item
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}));
//Get one doc
router.get("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield todo_model_1.Todo.findById(req.params._id);
        return res.status(200).json({
            data: item
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}));
//Update Document
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            title: req.body.title
        };
        const update = {
            description: req.body.description
        };
        const item = yield todo_model_1.Todo.updateOne(filter, update, {
            new: true,
        });
        return res.status(200).json({
            data: item
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}));
// Delete Document
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            title: req.body.title
        };
        const item = yield todo_model_1.Todo.updateOne(filter).then((data) => res.json({
            data: data
        })).catch((e) => {
            console.log(e);
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error,
        });
    }
}));
