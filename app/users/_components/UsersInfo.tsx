"use client";

import { signOut } from "next-auth/react";

function UsersInfo() {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export default UsersInfo;
