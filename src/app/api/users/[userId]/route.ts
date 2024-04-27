import { User } from "@/interfaces/users";
import { NextResponse } from "next/server";
import { KIND_ERRORS, UserError } from "../route";

export async function GET(
  _request: Request,
  context: { params: { userId: Number } }
) {
  try {
    const id = context.params.userId;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) {
      throw new UserError(
        "jsonplaceholder API - Internal Server Error",
        "HttpError"
      );
    }
    const user = (await response.json()) as User;
    return new NextResponse(JSON.stringify(user, null, 2));
  } catch (error) {
    if (error instanceof UserError) {
      if (KIND_ERRORS.includes(error.type)) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
    } else {
      return new NextResponse(JSON.stringify({ message: "error Unknown" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
