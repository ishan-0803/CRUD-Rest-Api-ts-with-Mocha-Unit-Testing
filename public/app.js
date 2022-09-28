"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes/routes");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err)
        console.log(err);
    else
        console.log("mongdb is connected");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", routes_1.router);
app.listen(process.env.PORT, () => {
    console.log(`Hare krsna , Server is running @ ${process.env.PORT}`);
});
