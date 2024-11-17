export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          {/* Professional spinner */}
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">
          Loading Your Experience...
        </h1>
        <p className="text-lg text-white opacity-75">
          Please wait while we set things up for you.
        </p>
      </div>
    </div>
  );
}
