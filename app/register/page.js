"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  async function submitHandler(e) {
    e.preventDefault();
    console.log("Form data ::::", formData);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(res.status === 201){
        return router.push("/login");
      }
      const data = await res.json();
      console.log("response from the register api :", data);
    } catch (error) {
      console.log("error in the sending the register data to BE ", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md rounded-lg border border-zinc-300 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="mb-6 text-center text-2xl font-semibold text-zinc-900 dark:text-white">
          Register
        </h2>

        <form
          method="POST"
          className="flex flex-col gap-y-5"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name
            </label>
            <input
              onChange={changeHandler}
              name="name"
              id="name"
              type="text"
              placeholder="Enter your name"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Username
            </label>
            <input
              onChange={changeHandler}
              name="username"
              id="username"
              type="email"
              placeholder="Enter your username"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              onChange={changeHandler}
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-black py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Register
          </button>
        </form>
      </div>
      <p className="text-gray-500">Already have an account <Link href="/login" className="text-blue-500 hover:underline">Login</Link></p>
    </div>
  );
}

export default page;
