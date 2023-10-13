import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/components/dashboard/Profile";

const fetchUserDetails = async () => {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name!;
  const email = session?.user?.email!;
  return { name, email };
};

const ProfilePage = async () => {
  const details = await fetchUserDetails();

  return <Profile {...details} />;
};

export default ProfilePage;
