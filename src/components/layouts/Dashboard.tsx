import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Configurator from "./Configurator";
import ConfiguratorBtn from "./ConfiguratorBtn";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <Navbar />
        <Configurator />
        <ConfiguratorBtn />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
