import { User } from "@/interfaces/users";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  console.log(user);

  return (
    <div key={user.id} className="mb-5 max-w-xs bg-white rounded-lg shadow-md">
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2 text-gray-500">{user.name}</div>
        <p className="text-gray-700">
          Username: {user.username} <br></br>
          Email: {user.email}
          <br></br>
          Phone: {user.phone}
          <br></br>
          <Link
            className="text-blue-400 hover:text-blue-700"
            href={{
              pathname: `/user-detail`,
              query: {
                userId: user.id,
              },
            }}
          >
            Explore Details
          </Link>
        </p>
      </div>
      <div className="px-6 pt-2 pb-2">
        <p className="text-gray-700">Friends</p>
        <Link
          className="text-blue-400 hover:text-blue-700"
          href={{
            pathname: `/user-detail`,
            query: { userId: user.friend.id },
          }}
        >
          {user.friend.name}
        </Link>
      </div>
    </div>
  );
}
