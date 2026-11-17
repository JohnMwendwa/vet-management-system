import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Employees from "@/components/dashboard/Employees";
import connectDB from "@/database/connection";
import User from "@/database/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const revalidate = 0;

const fetchEmployees = async () => {
  await connectDB();
  const data = await User.find({
    $or: [{ role: "nurse" }, { role: "doctor" }],
  }).sort({ createdAt: -1 });

  const dataJSON = JSON.stringify(data);
  return JSON.parse(dataJSON);
};

const EmployeesPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "doctor") {
    redirect("/dashboard/profile");
  }

  const employees = await fetchEmployees();
  return <Employees data={employees} />;
};

export default EmployeesPage;
