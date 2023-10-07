import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">{children}</div>
    </div>
  );
};

export default DashboardLayout;
