import MobileFooter from "./MobileFooter";
import DesktopSidebar from "./DesktopSidebar";

import getCurrentUser from "@/actions/getCurrentUser";

type Props = {
  children?: React.ReactNode;
};

async function Sidebar({ children }: Props) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
}

export default Sidebar;
