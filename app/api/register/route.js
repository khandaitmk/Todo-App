import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request, { params }) {
  try {
    await connectDB();
    const reqBody = await request.json();
    console.log("Request Body :", reqBody);
    const { name, username, password } = reqBody;
    if (!name || !username || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return Response.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      username: username,
      password: hashedPassword,
    });
    return Response.json(
      {
        data: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in the registration process",error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
