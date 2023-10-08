"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

import { useLayoutContext } from "@/contexts/layout-context";

const ConfiguratorBtn = () => {
  const { dispatch } = useLayoutContext();
  return (
    <IconButton
      size="lg"
      color="white"
      className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
      ripple={false}
      onClick={() => dispatch({ type: "OPEN_CONFIGURATOR", payload: true })}
    >
      <Cog6ToothIcon className="h-5 w-5" />
    </IconButton>
  );
};

export default ConfiguratorBtn;
