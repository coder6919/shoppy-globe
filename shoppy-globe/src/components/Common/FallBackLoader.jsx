import React from 'react';

const FallbackLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
      <p className="text-lg font-medium text-gray-700">
        Loading content... Please wait.
      </p>
    </div>
  );
};

export default FallbackLoader;