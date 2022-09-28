"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var routes_1 = require("./routes/routes");
var mongoose_1 = require("mongoose");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
mongoose_1["default"].connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function (err) {
    if (err)
        console.log(err);
    else
        console.log("mongdb is connected");
});
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use("/", routes_1.router);
app.listen(process.env.PORT, function () {
    console.log("Hare krsna , Server is running @ ".concat(process.env.PORT));
});
