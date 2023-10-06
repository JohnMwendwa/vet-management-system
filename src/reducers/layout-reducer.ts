export type Action =
  | {
      type: "OPEN_SIDENAV";
      payload: boolean;
    }
  | {
      type: "SIDENAV_TYPE";
      payload: string;
    }
  | {
      type: "SIDENAV_COLOR";
      payload: string;
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

export interface StateProps {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
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
