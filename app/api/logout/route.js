import { connectDB } from "@/lib/connectDB";
import Session from "@/models/Session";
import { cookies } from "next/headers";
export async function POST() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const cookie = cookieStore.get("sessionId")?.value;
    const sessionId = cookie.split(".")[0];
    await Session.findByIdAndDelete(sessionId);
    cookieStore.delete("sessionId");

    return Response.json(
      {
        message: "User logged OUt successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in the log out", error);
    return Response.json({
      error: "problem in the logOut",
    });
  }
}
