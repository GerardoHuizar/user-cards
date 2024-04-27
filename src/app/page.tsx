"use client";
import UserCard from "@/components/UserCard";
import { User } from "@/interfaces/users";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loader, setLoader] = useState<Boolean>(false);

  useEffect(() => {
    setLoader(true);
    fetch("api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoader(false);
  }, []);

  return (
    <>
      <div className="bg-slate-100 w-3/4 h-fit align-center p-5 rounded-xl">
        <p className="font-bold text-gray-800 mb-2 text-xl text-center mb-7">
          Users Profile
        </p>
        {/* responsive cards */}
        <div className="grid gris-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {users && !loader ? (
            users.map((user) => <UserCard user={user} />)
          ) : (
            <p className="font-bold text-gray-700 text-xl">Loading Users...</p>
          )}
        </div>
      </div>
    </>
  );
}
