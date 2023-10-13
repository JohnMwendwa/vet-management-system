import {
  Avatar,
  Card,
  CardBody,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@/components/Material";
import {
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";

interface ProfileProps {
  name: string;
  email: string;
}

const Profile = ({ name, email }: ProfileProps) => {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-6">
              <Avatar
                src="https://developers-home.vercel.app/api/users/profile/6399ec70bae966a1c3eb1e8c/avatar"
                alt="My profile image"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Profile Information
              </Typography>
              <ul className="flex flex-col gap-4 p-0">
                <li className="flex items-center gap-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize"
                  >
                    Name:
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {name}
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize"
                  >
                    Email:
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    {email}
                  </Typography>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Profile Description
                </Typography>
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              </div>

              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorum atque laborum culpa eveniet error, laudantium in minus
                obcaecati inventore, sapiente est officia iusto nulla
                dignissimos enim consectetur distinctio recusandae aperiam.
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Profile;
