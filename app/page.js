"use client";

// import todos from "../todos.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState({ text: "" });
  const [todos, setTodos] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetchData();
  }, [reload]);

  async function fetchData() {
    try {
      const res = await fetch("/api/todos", {
        method: "GET",
      });
      if (res.status === 401) {
        console.log("hello");
        return router.push("/login");
      }
      console.log("=======", res);

      const data = await res.json();
      setTodos(data);
      console.log("Todos from backend :", data);
    } catch (error) {
      console.log("error in fetching todos from backend :", error);
    }
  }
  function changeHandler(event) {
    setInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    console.log("Submitted", input);

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      console.log("Response from backend :", data);
      setReload((prev) => !prev);
    } catch (error) {
      console.log("error in sending to backend :", error);
    }
    setInput({ text: "" });
  }
  async function checkChangeHandler(id) {
    // console.log("Checkbox changed to :", check);
    // console.log("Checkbox id :", id);
    try {
      const res = await fetch("/api/todos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      setReload((prev) => !prev);
      // const data = await res.json();
      // console.log("Response from backend on changing the check :", data);
    } catch (error) {
      console.log("error in changing the check :", error);
    }
  }

  async function deleteHandler(id) {
    console.log("Delete clicked for id :", id);

    try {
      const res = await fetch("/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      setReload((prev) => !prev);
    } catch (error) {
      console.log("error in the delete todo :", error);
    }
  }

  async function logOutHandler(event) {
    try{
      const res = await fetch("/api/logout",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        }
      });
      if(res.status === 200){
        return router.push("/login");
      }
    } catch(error){
      console.log("Error in the logout");
    }
  }

  return (
    <div className="flex flex-col items-center pt-10 gap-y-10 min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-baseline cursor-pointer justify-between w-[40%]">
        <h1 className=" text-white text-5xl font-semibold">Todo App</h1>
        <div className="relative group">
          <FaUserAlt size={"1.5rem"} className=" text-white"></FaUserAlt>
          <div className="absolute w-48 top-[26] right-0.5 rounded-lg bg-zinc-900 border border-zinc-700 shadow-lg hidden group-hover:block">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-white">Manish Kishor</p>
              <p className="text-xs text-zinc-400 truncate">
                manishkhandait05@gmail.com
              </p>
            </div>

            <div className="border-t border-zinc-700" />

            <button
              onClick={logOutHandler}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-800 hover:text-red-500 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <form className=" flex w-full justify-center" onSubmit={submitHandler}>
        <input
          name="text"
          id="text"
          className="bg-white py-2 w-[40%] px-5 rounded-l-md"
          type="text"
          placeholder="Add a new task"
          value={input.text}
          onChange={changeHandler}
        />
        <button
          className="bg-gray-600 text-gray-900 font-semibold rounded-r-md p-2 cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="flex w-full max-w-2xl flex-col gap-3">
        {todos.map((item) => (
          <div
            key={item._id}
            className="group flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-sm transition hover:border-zinc-500"
          >
            {/* Left side: checkbox + text */}
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="h-5 w-5 cursor-pointer accent-green-500"
                checked={!!item.completed}
                onChange={(e) => checkChangeHandler(item._id, e.target.checked)}
              />

              <h2
                className={`max-w-[360px] break-words text-sm text-zinc-100 transition ${
                  item.completed
                    ? "line-through text-zinc-500"
                    : "text-zinc-100"
                }`}
              >
                {item.text}
              </h2>
            </div>

            {/* Delete button */}
            <button
              onClick={() => deleteHandler(item._id)}
              className="rounded-md px-2 py-1 text-sm font-medium text-red-400 opacity-0 transition hover:bg-red-500 hover:text-white group-hover:opacity-100"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
