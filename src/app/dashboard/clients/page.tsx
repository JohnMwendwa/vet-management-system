import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Clients from "@/components/dashboard/Clients";
import connectDB from "@/database/connection";
import User from "@/database/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const revalidate = 0;

const fetchClients = async () => {
  await connectDB();
  const data = await User.find({
    role: "client",
  }).sort({ createdAt: -1 });

  const dataJSON = JSON.stringify(data);
  return JSON.parse(dataJSON);
};

const ClientsPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "doctor") {
    redirect("/dashboard/profile");
  }

  const clients = await fetchClients();
  return <Clients data={clients} />;
};

export default ClientsPage;
