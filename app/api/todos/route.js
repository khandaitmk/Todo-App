import { writeFile } from "fs/promises";
// import todos from "../../todos.json";
import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/Todo";
import { getLoggedInUser } from "@/lib/auth";
export async function GET(request, { params }) {
  try {
    connectDB();
    const user = await getLoggedInUser();
    if (user instanceof Response) {
      // this check whether this user is instance of response or not as in the above function we return the user directly so user should not be the instance of the Response and if it is then it is absolutly the error so if this condition becomes true then return that error itself ..
      return user;
    }
    const todos = await Todo.find({ userId: user.id });
    return Response.json(todos);
  } catch (error) {
    console.log("error in fetching todos :", error);
  }
}

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
  const user = await getLoggedInUser();
  if (user instanceof Response) {
    return user;
  }
  const todo = await request.json();
  if (!todo.text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }
  console.log("Todo to be added :", todo);
  const newTodo = await Todo.create({
    text: todo.text,
    completed: false,
    userId: user.id,
  });
  // todos.push(newTodo); // for only json file
  // await writeFile("todos.json",JSON.stringify(todos, null, 2));
  return Response.json(todo, { status: 201 });
}

export async function PATCH(request, { params }) {
  const user = await getLoggedInUser();
  if (user instanceof Response) {
    return user;
  }
  const editTodoData = await request.json();
  console.log("Edit Todo id :", editTodoData);

  const todo = await Todo.findById(editTodoData.id);
  console.log("Edit Todo Data :", todo);

  // const todoIndex = todos.findIndex((t) => t.id === editTodoData.id);
  //  console.log("Edit Todo Data :", todoIndex);

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }
  const editedTodo = await Todo.findByIdAndUpdate(
    editTodoData.id,
    { completed: !todo.completed },
    { new: true }
  );
  // const editedTodo = {...todo,...editTodoData};
  // todos[todoIndex] = editedTodo;
  // await writeFile("todos.json",JSON.stringify(todos, null, 2));
  return Response.json(editedTodo);
}

export async function DELETE(request, { params }) {
  const { id } = await request.json();
  // const todoIndex = todos.findIndex((t) => t.id === id);
  //  console.log("Edit Todo Data :", id);
  const todo = await Todo.findByIdAndDelete(id);
  const todos = await Todo.find({});
  // todos.splice(todoIndex,1);

  // await writeFile("todos.json",JSON.stringify(todos, null, 2));
  return Response.json(todos);
}
