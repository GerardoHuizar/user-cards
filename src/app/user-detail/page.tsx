"use client";
import { User } from "@/interfaces/users";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail() {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState<Boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");

  useEffect(() => {
    setLoader(true);
    fetch("api/users/" + id)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => {
        console.error(error);
      });
    setLoader(false);
  }, [id]);

  return (
    <>
      <div className="rounded-xl shadow-md bg-slate-100 w-fit p-5 w-1/2">
        {user && !loader ? (
          <div>
            <p className="font-bold text-gray-500 text-lg mb-2">{user?.name}</p>
            <p>
              Username: {user.username} <br></br>
              Email: {user.email}
              <br></br>
              Phone: {user.phone}
              <br></br>
              Website: {user.website}
              <br></br>
              Address: {user.address.street} {user.address.suite}{" "}
              {user.address.city}
              {user.address.zipcode}
              <br></br>
              Lat - Lon: {user.address.geo.lat} {user.address.geo.lng}
              <br></br>
              Company: {user.company.name} {user.company.bs}
              <br></br>
              Catch Phrase: {user.company.catchPhrase}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 font-bold text-xl">
            Loading User Information...
          </p>
        )}
      </div>
    </>
  );
}
