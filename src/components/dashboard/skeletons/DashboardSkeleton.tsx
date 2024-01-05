const DashboardSkeleton = () => {
  return (
    <div className="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 animate-pulse">
      <div className="relative bg-white rounded-md w-full">
        <div className="absolute -top-4 left-3 h-16 w-16 bg-blue-300 rounded-lg"></div>
        <div className="flex justify-end items-start border-b-2 w-full p-8">
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-24 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        <div className="px-4 py-6">
          <div className="bg-gray-300 w-full h-4 rounded-full"></div>
        </div>
      </div>
      <div className="relative bg-white rounded-md w-full">
        <div className="absolute -top-4 left-3 h-16 w-16 bg-orange-300 rounded-lg"></div>
        <div className="flex justify-end items-start border-b-2 w-full p-8">
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-24 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
        <div className="px-4 py-6">
          <div className="bg-gray-300 w-full h-4 rounded-full"></div>
        </div>
      </div>
      <div className="relative bg-white rounded-md w-full">
        <div className="absolute -top-4 left-3 h-16 w-16 bg-green-300 rounded-lg"></div>
        <div className="flex justify-end items-start border-b-2 w-full p-8">
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
            <div className="self-end w-12 h-3 bg-blue-200 rounded-full"></div>
          </div>
        </div>
        <div className="px-4 py-6">
          <div className="bg-gray-300 w-full h-4 rounded-full"></div>
        </div>
      </div>
      <div className="relative bg-white rounded-md w-full">
        <div className="absolute -top-4 left-3 h-16 w-16 bg-blue-gray-400 rounded-lg"></div>
        <div className="flex justify-end items-start border-b-2 w-full p-8">
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
            <div className="self-end w-12 h-3 bg-blue-200 rounded-full"></div>
          </div>
        </div>
        <div className="px-4 py-6">
          <div className="bg-gray-300 w-full h-4 rounded-full"></div>
        </div>
      </div>
      <div className="relative bg-white rounded-md w-full">
        <div className="absolute -top-4 left-3 h-16 w-16 bg-indigo-300 rounded-lg"></div>
        <div className="flex justify-end items-start border-b-2 w-full p-8">
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-300 rounded-full"></div>
            <div className="self-end w-12 h-3 bg-blue-200 rounded-full"></div>
          </div>
        </div>
        <div className="px-4 py-6">
          <div className="bg-gray-300 w-full h-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
