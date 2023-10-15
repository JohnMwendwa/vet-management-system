import { UserProps } from "@/database/models/User";
import formateDate from "@/helpers/format-date";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
} from "@/components/Material";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import EditDialog from "../EditDialog";
import DeleteDialog from "../DeleteDialog";
import AddDialog from "../AddDialog";

interface ClientsProps {
  data: UserProps[];
}

const Clients = ({ data }: ClientsProps) => {
  return (
    <Card className="mt-12 mb-8 flex flex-col w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Clients list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about your clients
            </Typography>
          </div>
          <div className="flex w-full sm:w-auto flex-col-reverse sm:flex-co md:flex-row shrink-0 gap-3 md:w-max">
            <div className="w-full md:w-72">
              <Input
                crossOrigin={""}
                label="Search"
                color="blue"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <AddDialog
              title="Client"
              url="/api/clients"
              className="flex items-center gap-3 py-4 md:py-0"
              color="blue"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add New
              Client
            </AddDialog>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 overflow-x-scroll">
        <table className="w-full min-w-max table-auto">
          <thead>
            <tr>
              {["client", "date created", ""].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50  bg-blue-500 p-5 text-left"
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
                    <EditDialog
                      first={firstName}
                      last={lastName}
                      userEmail={email}
                      id={_id.toString()}
                      url="/api/clients"
                    />
                    <DeleteDialog
                      name={`${firstName} ${lastName}`}
                      email={email}
                      id={_id.toString()}
                      url="/api/clients"
                    />
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
