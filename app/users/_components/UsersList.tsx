import { User } from "@prisma/client";

import UserBox from "./UserBox";

type Props = {
  users: User[];
};

function UsersList({ users }: Props) {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5 flex-col">
        <p className="text-2xl font-bold py-4 text-neutral-800">People</p>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
}

export default UsersList;
