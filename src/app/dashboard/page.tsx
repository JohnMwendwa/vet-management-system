import Home from "@/components/dashboard/Home";
import connectDB from "@/database/connection";
import User from "@/database/models/User";

const fetchStatistics = async () => {
  await connectDB();
  const employees = await User.find({
    $or: [
      {
        role: "doctor",
      },
      { role: "nurse" },
    ],
  }).count();
  const clients = await User.find({ role: "client" });

  const totalClients = clients.length;
  const newClients = clients
    .map((c) => c.createdAt)
    .reduce((acc, curr) => {
      const date1 = new Date(curr).toISOString().split("T")[0];
      const today = new Date().toISOString().split("T")[0];
      if (date1 === today) {
        acc++;
      }
      return acc;
    }, 0);

  const weekySales = 1500000;
  const totalSales = 15780000;

  return { employees, totalClients, newClients, weekySales, totalSales };
};

const DashboardPage = async () => {
  const data = await fetchStatistics();

  return <Home {...data} />;
};

export default DashboardPage;
