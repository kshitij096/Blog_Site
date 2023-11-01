const SkeletonEditPost = () => {
  return (
    <form className="w-full flex flex-wrap">
      <div className="w-2/3 lg:w-2/3 px-2 mt-6">
        <div className="mb-4 w-full px-3 py-2 rounded-lg border-gray-200 h-11 bg-gray-300 animate-pulse"></div>
        <div className="mb-4 w-full mt-10 px-3 py-2 rounded-lg border-gray-200 h-11 bg-gray-300 animate-pulse"></div>
        <div className="h-96 mt-10 lg:h-[27rem] w-full bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
      <div className="w-1/3 lg:w-1/3 px-2 mt-6">
        <div className="mb-4 w-full px-3 py-2 rounded-lg border-gray-200 h-11 bg-gray-300 animate-pulse"></div>
        <div className="mb-4 w-full mt-4 px-3 py-2 rounded-lg border-gray-200 h-32 lg:h-96 bg-gray-300 animate-pulse"></div>

        <div className="mb-4 w-full mt-4 px-3 py-2 rounded-lg border-gray-200 h-11 bg-gray-300 animate-pulse"></div>
        <div className="mb-4 w-full mt-4 px-3 py-2 rounded-lg border-gray-200 h-11 bg-gray-300 animate-pulse"></div>
      </div>
    </form>
  );
};

export default SkeletonEditPost;
