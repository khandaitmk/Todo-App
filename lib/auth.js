import Session from "@/models/Session";
import User from "@/models/User";
import { createHmac } from "crypto";
import { cookies } from "next/headers";

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("sessionId")?.value;
  if (!cookie) {
    return Response.json(
      {
        error: "PLease Login",
      },
      {
        status: 401,
      }
    );
  }
  const sessionId = verifyCookie(cookie);
  const session = await Session.findById(sessionId);
  const user = await User.findById(session.userId);
  if (!user) {
    return Response.json(
      {
        error: "PLease Login",
      },
      {
        status: 401,
      }
    );
  };
  return user;
};

export function signCookie(cookie){
    const signature = createHmac("sha256",process.env.COOKIE_SECRET).update(cookie).digest("hex");
    return `${cookie}.${signature}`;
};

export function verifyCookie(signedCookie){
    const [cookie,cookieSignature] = signedCookie.split(".");
    const signature = signCookie(cookie).split(".")[1];

    if(signature === cookieSignature){
        return cookie;
    }
    return false;
}