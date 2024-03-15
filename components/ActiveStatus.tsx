"use client";

import useActiveChannel from "@/hooks/use-active-channel";

function ActiveStatus() {
  useActiveChannel();
  return null;
}

export default ActiveStatus;
