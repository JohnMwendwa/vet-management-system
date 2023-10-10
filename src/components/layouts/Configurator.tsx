"use client";

import { useLayoutContext } from "@/contexts/layout-context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
} from "@material-tailwind/react";

const Configurator = () => {
  const {
    state: { openConfigurator, sidenavColor, sidenavType, fixedNavbar },
    dispatch,
  } = useLayoutContext();

  const sidenavColors = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };
  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() =>
            dispatch({ type: "OPEN_CONFIGURATOR", payload: false })
          }
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color as keyof typeof sidenavColors]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() =>
                  dispatch({
                    type: "SIDENAV_COLOR",
                    payload: color as keyof typeof sidenavColors,
                  })
                }
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() =>
                dispatch({ type: "SIDENAV_TYPE", payload: "dark" })
              }
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() =>
                dispatch({ type: "SIDENAV_TYPE", payload: "transparent" })
              }
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() =>
                dispatch({ type: "SIDENAV_TYPE", payload: "white" })
              }
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              crossOrigin={""}
              defaultChecked={fixedNavbar}
              onChange={() =>
                dispatch({ type: "FIXED_NAVBAR", payload: !fixedNavbar })
              }
            />
          </div>
          <hr />
        </div>
      </div>
    </aside>
  );
};

export default Configurator;
