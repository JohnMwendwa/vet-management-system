const EmployeesSkeleton = () => {
  return (
    <div className="mt-12 mb-8 flex flex-col w-full animate-pulse  bg-white rounded-lg">
      <div className=" p-8">
        <div className="flex items-center justify-between">
          {/* Heading */}
          <div>
            <div className="mb-4 h-4 w-36 rounded-full bg-gray-300">&nbsp;</div>
            <div className="mb-4 h-3 w-72 rounded-full bg-gray-300">&nbsp;</div>
          </div>
          {/* Add employee button */}
          <div className="w-36 h-8 bg-blue-300 rounded-md">&nbsp;</div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Filter buttons */}
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-16 h-8 bg-gray-300 rounded-md">
                &nbsp;
              </div>
            ))}
          </div>
          {/* Input field skeleton */}
          <div className="w-48 h-8 bg-gray-300 rounded-md">&nbsp;</div>
        </div>
      </div>
      <div className="w-full px-0 rounded-b-lg">
        <div className="bg-blue-300 w-full flex justify-around items-center p-5">
          {/* Name */}
          <div className="bg-gray-200 h-3 w-24 rounded-full">&nbsp;</div>
          {/* Role */}
          <div className="bg-gray-200 h-3 w-24 rounded-full">&nbsp;</div>
          {/* Date */}
          <div className="bg-gray-200 h-3 w-24 rounded-full">&nbsp;</div>
          <div className="bg-blue-300 h-3 w-24 rounded-full">&nbsp;</div>
        </div>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-200 group odd:bg-gray-300 p-4 w-full flex justify-around items-center"
          >
            <div className="flex flex-col gap-2">
              <div className="bg-gray-100 group-even:bg-gray-50 h-3 w-24 rounded-full">
                &nbsp;
              </div>
              <div className="bg-gray-100 group-even:bg-gray-50 h-3 w-24 rounded-full">
                &nbsp;
              </div>
            </div>
            <div className="bg-gray-200 group-even:bg-gray-50 h-3 w-12 rounded-full">
              &nbsp;
            </div>
            <div className="bg-gray-200 group-even:bg-gray-50 h-3 w-24 rounded-full">
              &nbsp;
            </div>
            {/* Action buttons */}
            <div className="flex gap-2">
              <div className="bg-blue-200 h-5 w-4 rounded-sm">&nbsp;</div>
              <div className="bg-red-200 h-5 w-4 rounded-sm">&nbsp;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesSkeleton;
