export type Action =
  | {
      type: "OPEN_SIDENAV";
      payload: boolean;
    }
  | {
      type: "SIDENAV_TYPE";
      payload: "dark" | "white" | "transparent";
    }
  | {
      type: "SIDENAV_COLOR";
      payload: color;
    }
  | {
      type: "TRANSPARENT_NAVBAR";
      payload: boolean;
    }
  | {
      type: "FIXED_NAVBAR";
      payload: boolean;
    }
  | {
      type: "OPEN_CONFIGURATOR";
      payload: boolean;
    };

export type color =
  | "white"
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

export interface StateProps {
  openSidenav: boolean;
  sidenavColor: color;
  sidenavType: "dark" | "white" | "transparent";
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

export const initialLayoutState: StateProps = {
  openSidenav: false,
  sidenavColor: "blue",
  sidenavType: "dark",
  transparentNavbar: true,
  fixedNavbar: false,
  openConfigurator: false,
};

export const layoutReducer = (state: StateProps, action: Action) => {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.payload };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.payload };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.payload };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.payload };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.payload };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.payload };
    default: {
      return state;
    }
  }
};
