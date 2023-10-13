import { UserPlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { UserProps } from "@/database/models/User";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@/components/Material";
import formatDate from "@/helpers/format-date";
import EditDialog from "../EditDialog";

interface EmployeesProps {
  data: UserProps[];
}

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Doctor",
    value: "doctor",
  },
  {
    label: "Nurse",
    value: "nurse",
  },
];

const Employees = ({ data }: EmployeesProps) => {
  return (
    <Card className="mt-12 mb-8 flex flex-col">
      <CardHeader floated={false} shadow={false} className="rounded-none p-4">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Employees list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about your employees
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New
              Employee
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              crossOrigin={""}
              label="Search"
              color="blue"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto text-left">
          <thead>
            <tr>
              {["employee", "role", "date employed", ""].map((el) => (
                <th
                  key={el}
                  className="border-y border-blue-gray-100 bg-blue-500 p-5"
                >
                  <Typography
                    variant="small"
                    className="font-bold uppercase text-white"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ _id, firstName, lastName, email, role, createdAt }, idx) => {
                const className = `py-3 px-5 ${
                  idx === data.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={_id.toString()} className="even:bg-blue-gray-50/50">
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {firstName} {lastName}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {role}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {formatDate(createdAt)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <EditDialog
                        first={firstName}
                        last={lastName}
                        userEmail={email}
                        id={_id.toString()}
                        url="/api/employees"
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default Employees;
