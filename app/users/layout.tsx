import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";

import UsersList from "./_components/UsersList";

type Props = {
  children: React.ReactNode;
};

async function UsersLayout({ children }: Props) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UsersList users={users}/>
        {children}</div>
    </Sidebar>
  );
}

export default UsersLayout;
