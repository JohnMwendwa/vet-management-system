const ProfileSkeleton = () => {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl animate-pulse -z-10 bg-indigo-500"></div>
      <div className="-mt-16 mb-6 animate-pulse bg-white w-[97%] rounded-lg mx-auto p-8">
        <div className="flex flex-col md:flex-row md:justify-between mb-6 ">
          <div className="flex items-center gap-4 pb-4 md:pb-0">
            <div className="h-16 w-16 rounded-full bg-gray-400"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-400 h-3 w-24 rounded-full"></div>
              <div className="bg-gray-300 h-3 w-24 rounded-full"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-gray-300 h-7 w-24 rounded-md"></div>
            <div className="bg-gray-300 h-7 w-24 rounded-md"></div>
            <div className="bg-gray-300 h-7 w-24 rounded-md"></div>
          </div>
        </div>
        <div className="gird-cols-1 mb-12 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="w-full flex flex-col gap-4">
            <div className="bg-gray-400 h-4 w-32 rounded-full"></div>
            <div className="flex gap-2">
              <div className="bg-gray-400 w-12 h-3 rounded-full"></div>
              <div className="bg-gray-300 w-24 h-3 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-400 w-12 h-3 rounded-full"></div>
              <div className="bg-gray-300 w-24 h-3 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-gray-400 h-4 w-48 rounded-full"></div>
            <div className="bg-gray-300 h-20 w-full rounded-md"></div>
          </div>
          <div className="w-full lg:pl-4">
            <div className="bg-gray-400 h-4 w-32 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
