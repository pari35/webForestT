import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    name: String,
    task: String,
})
  
const TodoModel = mongoose.model("todos", TodoSchema)
export default TodoModel