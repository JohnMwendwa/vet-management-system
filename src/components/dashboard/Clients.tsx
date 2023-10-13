import { UserProps } from "@/database/models/User";
import formateDate from "@/helpers/format-date";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
} from "@/components/Material";
import { PencilIcon } from "@heroicons/react/24/solid";

interface ClientsProps {
  data: UserProps[];
}

const Clients = ({ data }: ClientsProps) => {
  return (
    <Card className="mt-12 mb-8 flex flex-col w-full">
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Clients Table
        </Typography>
      </CardHeader>
      <CardBody className="px-0 overflow-x-scroll">
        <table className="w-full min-w-max table-auto">
          <thead>
            <tr>
              {["client", "date created", ""].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50  py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ _id, firstName, lastName, email, createdAt }, idx) => {
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
                      {formateDate(createdAt)}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default Clients;
