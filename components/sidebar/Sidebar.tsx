import DesktopSidebar from "./DesktopSidebar";

type Props = {
  children?: React.ReactNode;
};

async function Sidebar({ children }: Props) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
}

export default Sidebar;
