import Clients from "@/components/dashboard/Clients";
import connectDB from "@/database/connection";
import User from "@/database/models/User";

export const revalidate = 0;

const fetchClients = async () => {
  await connectDB();
  const data = await User.find({
    role: "client",
  });
  const dataJSON = JSON.stringify(data);
  return JSON.parse(dataJSON);
};

const ClientsPage = async () => {
  const clients = await fetchClients();
  return <Clients data={clients} />;
};

export default ClientsPage;
