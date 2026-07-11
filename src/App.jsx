function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🎉 Tailwind CSS is Working!
        </h1>

        <p className="text-gray-600 mb-6">
          If you can see this card with a dark background, rounded corners, and
          blue heading, then Tailwind CSS is successfully loaded.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;