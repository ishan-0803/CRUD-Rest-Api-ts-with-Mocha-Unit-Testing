"use strict";
exports.__esModule = true;
exports.Todo = void 0;
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1["default"].Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});
todoSchema.statics.set = function (x) {
    return new Todo(x);
};
var Todo = mongoose_1["default"].model("Todo", todoSchema);
exports.Todo = Todo;
Todo.set({
    title: "krsna title",
    description: "krsna description"
});
