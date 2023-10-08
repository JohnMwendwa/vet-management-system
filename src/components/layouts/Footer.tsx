import { Typography } from "@/components/Material";

const Footer = () => {
  return (
    <footer className="py-2 w-full text-blue-gray-600">
      <Typography
        variant="small"
        className="font-normal text-inherit text-center"
      >
        &copy; Vet Service {new Date().getFullYear()}
      </Typography>
    </footer>
  );
};

export default Footer;
