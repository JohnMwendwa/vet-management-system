const ClientsSkeleton = () => {
  return (
    <div className="mt-12 mb-8 flex flex-col w-full animate-pulse  bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-8 p-8">
        <div>
          <div className="mb-4 h-4 w-36 rounded-full bg-gray-300"> &nbsp;</div>
          <div className="mb-4 h-3 w-72 rounded-full bg-gray-300"> &nbsp;</div>
        </div>
        <div className="flex w-full sm:w-auto flex-col-reverse sm:flex-co md:flex-row shrink-0 gap-3 md:w-max">
          <div className="w-36 h-8 bg-gray-300 rounded-md">&nbsp;</div>
          <div className="w-28 h-8 bg-blue-300 rounded-md">&nbsp;</div>
        </div>
      </div>
      <div className="w-full px-0 rounded-b-lg">
        <div className="bg-blue-300 w-full flex justify-around items-center p-5">
          <div className="bg-gray-200 h-3 w-24 rounded-full">&nbsp;</div>
          <div className="bg-gray-200 h-3 w-24 rounded-full">&nbsp;</div>
          <div className="bg-blue-300 h-3 w-24 rounded-full">&nbsp;</div>
        </div>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-200 odd:bg-gray-300 w-full flex justify-around items-center group p-4"
          >
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="bg-gray-100 group-even:bg-gray-50 h-3 w-24 rounded-full">
                &nbsp;
              </div>
              <div className="bg-gray-100 group-even:bg-gray-50 h-3 w-24 rounded-full">
                &nbsp;
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-200 group-even:bg-gray-50 h-3 w-24 rounded-full mx-auto">
                &nbsp;
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex gap-2 flex-1 justify-center">
              <div className="bg-blue-200 h-5 w-4 rounded-sm">&nbsp;</div>
              <div className="bg-red-200 h-5 w-4 rounded-sm">&nbsp;</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsSkeleton;
