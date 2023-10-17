import Employees from "@/components/dashboard/Employees";
import connectDB from "@/database/connection";
import User from "@/database/models/User";

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
  const employees = await fetchEmployees();
  return <Employees data={employees} />;
};

export default EmployeesPage;
