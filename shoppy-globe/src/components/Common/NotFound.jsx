import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError();
  let statusText = 'Page Not Found';
  let errorMessage = 'The page you are looking for doesn\'t exist or an unexpected error occurred.';
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"; // Direct utility classes

  // Display proper error details on the UI
  if (isRouteErrorResponse(error)) {
    statusText = `${error.status} ${error.statusText}`;
    // Use the error data if available, otherwise use status text
    errorMessage = error.data || statusText; 
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={`${containerClass} flex flex-col items-center justify-center min-h-screen text-center bg-gray-50`}>
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full">
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">
          {isRouteErrorResponse(error) ? error.status : '404'}
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
          {statusText}
        </h2>
        
        {/* Proper Error Details on UI */}
        <p className="text-lg text-red-600 font-mono bg-gray-100 p-4 rounded-md border border-red-200 mb-8 break-all">
          **Error Detail:** {errorMessage}
        </p>

        <Link
          to="/"
          className="inline-block py-3 px-8 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;