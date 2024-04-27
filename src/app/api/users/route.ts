import { User } from "@/interfaces/users";
import { NextResponse } from "next/server";
export const KIND_ERRORS = ["HttpError"];
export class UserError extends Error {
  constructor(message: string, public type: "HttpError") {
    super(message);
  }
}

export async function GET(): Promise<User | unknown> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new UserError(
        "jsonplaceholder API - Internal Server Error",
        "HttpError"
      );
    }
    const users = (await response.json()) as User[];

    const usersWithFriends = users.map((user) => {
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];

      return {
        ...user,
        friend: {
          name: randomUser.name,
          id: randomUser.id,
        },
      };
    });
    return new NextResponse(JSON.stringify(usersWithFriends));
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
