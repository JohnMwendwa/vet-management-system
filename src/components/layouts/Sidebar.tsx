"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
  BellIcon,
  CalendarDaysIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useLayoutContext } from "@/contexts/layout-context";

interface SidenavType {
  dark: string;
  white: string;
  transparent: string;
}

interface SidebarProps {
  brandImg?: string;
  brandName?: string;
}

const Sidebar = ({
  brandImg = "",
  brandName = "Vet Service",
}: SidebarProps) => {
  const {
    state: { sidenavColor, sidenavType, openSidenav },
    dispatch,
  } = useLayoutContext();

  const pathname = usePathname();

  const sidenavTypes: SidenavType = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 `}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link href={"/"} className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => dispatch({ type: "OPEN_SIDENAV", payload: false })}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map((route) => (
            <li key={route.name}>
              <Link href={route.path}>
                <Button
                  variant={`${pathname === route.path ? "gradient" : "text"}`}
                  color={`${
                    pathname === route.path
                      ? sidenavColor
                      : sidenavType === "dark"
                      ? "white"
                      : "blue-gray"
                  }`}
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  {route.icon}
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    {route.name}
                  </Typography>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    name: "Dashboard",
    icon: <HomeIcon {...icon} />,
    path: "/dashboard",
  },
  {
    name: "Profile",
    icon: <UserCircleIcon {...icon} />,
    path: "/dashboard/profile",
  },
  {
    name: "clients",
    icon: <UsersIcon {...icon} />,
    path: "/dashboard/clients",
  },
  {
    name: "Employees",
    icon: <UserGroupIcon {...icon} />,
    path: "/dashboard/employees",
  },
  {
    name: "Appointments",
    icon: <CalendarDaysIcon {...icon} />,
    path: "/dashboard/appointments",
  },
  {
    name: "Notifications",
    icon: <BellIcon {...icon} />,
    path: "/dashboard/notifications",
  },
];

export default Sidebar;
