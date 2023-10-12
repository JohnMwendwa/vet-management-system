import { Typography } from "@/components/Material";
import { StatisticsCard } from "../StatisticsCard";
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface HomeProps {
  employees: number;
  newClients: number;
  totalClients: number;
  weekySales: number;
  totalSales: number;
}

const Home = ({
  employees,
  newClients,
  totalClients,
  weekySales,
  totalSales,
}: HomeProps) => {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title="Weekly Sales"
          icon={<BanknotesIcon className="w-7 h-7 text-inherit" />}
          value={weekySales}
          color="blue"
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+3%</strong>
              &nbsp; higher than yesterday
            </Typography>
          }
        />
        <StatisticsCard
          title="Total Sales"
          icon={<ChartBarSquareIcon className="w-7 h-7 text-inherit" />}
          value={totalSales}
          color="orange"
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+3%</strong>
              &nbsp; higher than last month
            </Typography>
          }
        />
        <StatisticsCard
          title="New Clients"
          icon={<UserPlusIcon className="w-7 h-7 text-inherit" />}
          value={
            <Link
              href={"/dashboard/clients"}
              className="text-blue-600 hover:text-blue-400"
            >
              {newClients}
            </Link>
          }
          color="green"
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+3%</strong>
              &nbsp; higher than yesterday
            </Typography>
          }
        />
        <StatisticsCard
          title="Total Clients"
          icon={<UsersIcon className="w-7 h-7 text-inherit" />}
          value={
            <Link
              href={"/dashboard/clients"}
              className="text-blue-600 hover:text-blue-400"
            >
              {totalClients}
            </Link>
          }
          color="blue-gray"
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+10%</strong>
              &nbsp; higher than last month
            </Typography>
          }
        />
        <StatisticsCard
          title="Employees"
          icon={<UserGroupIcon className="w-7 h-7 text-inherit" />}
          value={
            <Link
              href={"/dashboard/employees"}
              className="text-blue-600 hover:text-blue-400"
            >
              {employees}
            </Link>
          }
          color="indigo"
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+8%</strong>
              &nbsp; higher than last year
            </Typography>
          }
        />
      </div>
    </div>
  );
};

export default Home;
