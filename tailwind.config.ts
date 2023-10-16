import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        rose: colors.rose,
        cyan: colors.cyan,
        slate: colors.slate,
        sky: colors.sky,
      },
    },
  },
  plugins: [],
};
export default withMT(config);
