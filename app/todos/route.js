import { writeFile } from "fs/promises";
// import todos from "../../todos.json";
import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/Todo";
export async function GET(request, { params }) {
  connectDB();
  const todos = await Todo.find({});
    return Response.json(todos);
};

// export async function POST(request, { params }) {
//   const id = crypto.randomUUID();
//   const todo = await request.json();
//   if(!todo.text){
//     return Response.json({ error: "Text is required" }, { status: 400 });
//   }
//   todo.id = id;
//   todo.completed = false;
//   todos.push(todo);
//   await writeFile("todos.json",JSON.stringify(todos, null, 2));
//   return Response.json(todo, { status: 201 });
// };

export async function POST(request, { params }) {
  connectDB();
  const todo = await request.json();
  if(!todo.text){
    return Response.json({ error: "Text is required" }, { status: 400 });
  }
  console.log("Todo to be added :", todo);
  const newTodo = await Todo.create({
    text: todo.text,
    completed: false,
  });
  // todos.push(newTodo); // for only json file
  // await writeFile("todos.json",JSON.stringify(todos, null, 2));
  return Response.json(todo, { status: 201 });
};


export async function PATCH(request, { params }) {
 const editTodoData = await request.json();
      console.log("Edit Todo id :", editTodoData);

    const todo = await Todo.findById(editTodoData.id);
     console.log("Edit Todo Data :", todo);

    // const todoIndex = todos.findIndex((t) => t.id === editTodoData.id);
    //  console.log("Edit Todo Data :", todoIndex);

    if(!todo){
      return Response.json({ error: "Todo not found" }, { status: 404 });
    };
    const editedTodo = await Todo.findByIdAndUpdate(editTodoData.id, {completed: editTodoData.completed}, {new: true});
    // const editedTodo = {...todo,...editTodoData};
    // todos[todoIndex] = editedTodo;
    // await writeFile("todos.json",JSON.stringify(todos, null, 2));
    return Response.json(editedTodo);
};

export async function DELETE(request, { params }) {
 const {id} = await request.json();
    // const todoIndex = todos.findIndex((t) => t.id === id);
    //  console.log("Edit Todo Data :", id);
    const todo = await Todo.findByIdAndDelete(id);
    const todos = await Todo.find({});
    // todos.splice(todoIndex,1);

    // await writeFile("todos.json",JSON.stringify(todos, null, 2));
    return Response.json(todos);
}