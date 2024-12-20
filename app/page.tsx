export default function Home() {
  return (
    <div className="bg-primary text-secondary min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto p-4">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-2">Welcome to Lotto G!</h1>
          <p className="text-xl mb-4">Your chance to win big starts here!</p>
          <button className="bg-blue-500 text-white py-3 px-6 rounded text-lg">
            Get Started
          </button>
        </div>

        {/* Current Lottery Info */}
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h2 className="text-3xl font-semibold mb-4">Current Lottery</h2>
          <p className="text-lg">
            Next Draw:{" "}
            <strong>
              {
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toLocaleString()
                  .split(",")[0]
              }
            </strong>
          </p>
          <p className="text-lg">
            Jackpot Amount: <strong>₹ X,XXX,XXX</strong>
          </p>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
            Purchase Ticket
          </button>
        </div>

        {/* Promotional Banner */}
        <div className="bg-yellow-300 text-black text-center p-4 rounded mb-6">
          <h2 className="text-2xl font-semibold">Special Promotion!</h2>
          <p>Buy 2 tickets and get 1 free! Limited time offer.</p>
        </div>

        {/* Recent Winners Section */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-3xl font-semibold mb-4">Recent Winners</h2>
          <ul className="list-disc pl-5">
            <li>John Doe - ₹ 1,000,000</li>
            <li>Jane Smith - ₹ 500,000</li>
            <li>Bob Johnson - ₹ 250,000</li>
          </ul>
        </div>

        {/* Footer Links */}
        <footer className="mt-10 text-center">
          <p>Learn more about our games:</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-500">
              How to Play
            </a>
            <a href="#" className="text-blue-500">
              Rules
            </a>
            <a href="#" className="text-blue-500">
              Contact Us
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
