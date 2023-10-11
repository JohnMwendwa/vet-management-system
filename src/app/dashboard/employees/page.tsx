import Employees from "@/components/dashboard/Employees";
import connectDB from "@/database/connection";
import User from "@/database/models/User";

const fetchEmployees = async () => {
  await connectDB();
  const data = await User.find({
    $or: [{ role: "nurse" }, { role: "doctor" }],
  });
  const dataJSON = JSON.stringify(data);
  return JSON.parse(dataJSON);
};

const EmployeesPage = async () => {
  const employees = await fetchEmployees();
  return <Employees data={employees} />;
};

export default EmployeesPage;
