import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signCookie } from "@/lib/auth";
import Session from "@/models/Session";

export async function POST(request, { params }) {
  try {
    await connectDB();
    const cookieStore = await cookies();

    const { username, password } = await request.json();
    if (!username || !password) {
      return Response.json(
        {
          error: "please fill all the fields",
        },
        {
          status: 401,
        }
      );
    }
    const user = await User.findOne({ username: username });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        {
          error: "please provide the valid password",
        },
        {
          status: 400,
        }
      );
    }
    const session = await Session.create({userId:user.id});
    console.log("=======",session._id);
    cookieStore.set("sessionId", signCookie(session._id.toString()), {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    return Response.json(
      {
        data: user,
        message: "user loged in successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error in the login :", error);
    return Response.json({ error: "error in the login in the backend " });
  }
}
