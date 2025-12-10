"use client";

// import todos from "../todos.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [input,setInput]=useState({text:""});
  const [todos,setTodos]=useState([]);
  const [reload,setReload]=useState(false);
  useEffect(() =>{
    fetchData();
  },[reload]);
  
  async function fetchData(){
    try{
      const res = await fetch("/todos",{
        method: "GET",
      });
      console.log("=======",res);
      const data = await res.json();
      setTodos(data);
      console.log("Todos from backend :", data);
    } catch(error){
      console.log("error in fetching todos from backend :", error);
    }
  }
  function changeHandler(event){
    setInput((prev)=> {
      return({...prev,[event.target.name]:event.target.value});
    });
  }

  async function submitHandler(event){
  event.preventDefault();
  console.log("Submitted", input);
  
  try{
    const res =await fetch("/todos",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    console.log("Response from backend :", data);
    setReload((prev) => !prev);
  } catch(error){
    console.log("error in sending to backend :",error);
  }
  setInput({ text: "" });

}
 async function checkChangeHandler(id,check){
  console.log("Checkbox changed to :", check);
    console.log("Checkbox id :", id);
  try{
    const res = fetch("/todos",{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: check}),
    });
    setReload((prev) => !prev);
    // const data = await res.json();
    // console.log("Response from backend on changing the check :", data);
  }
  catch(error){
    console.log("error in changing the check :",error);
  }
 };

 async function deleteHandler(id){
  console.log("Delete clicked for id :", id);

  try{
    const res = fetch("/todos",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id}),
    });
    setReload((prev) => !prev);
  } catch(error){
    console.log("error in the delete todo :", error);
  }
 }

 
  return (
    <div className="flex flex-col items-center pt-10 gap-y-10 min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      <h1 className=" text-white text-5xl font-semibold">Todo  App</h1>
      <form className=" flex w-full justify-center" onSubmit={submitHandler} >
        <input name="text" id="text" className="bg-white py-2 w-[40%] px-5 rounded-l-md" type="text" placeholder="Add a new task" value={input.text} onChange={changeHandler}/>
        <button  className="bg-gray-600 text-gray-900 font-semibold rounded-r-md p-2 cursor-pointer" type="submit" >Add</button>
      </form>
      <div className=" flex flex-col gap-3 ">
        {
          todos.map((item,index) => (
            <div key={index} className=" flex items-center border border-white p-2 rounded-md pl-10">
              <input type="checkbox" className="w-5 h-5" checked={!!item.completed} onChange={(event) => checkChangeHandler(item._id,event.target.checked)} />
              <h2  className={`text-white w-[400px] p-4 rounded-md  shadow-md ${item.completed ? ' line-through' : ''}`}>
                {item.text}
              </h2>
              <p className=" text-white cursor-pointer" onClick={(event) => deleteHandler(item._id)}> D</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
