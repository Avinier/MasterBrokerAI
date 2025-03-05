import React from "react";
import ClientCube from "~/components/Dashboard/ClientCube";
import AnimatedBackground from "~/components/UI/AnimatedBackground";
import Navbar from "~/components/UI/NavBar"; // Import the Navbar component
import { Building, MapPin, DollarSign, Home, IndianRupee } from "lucide-react"; // Import icons

const clients = [
  { clientName: "John Doe", location: "New York", type: "Rent", budget: "₹2000/month", bhk: "2 BHK" },
  { clientName: "Alice Smith", location: "Los Angeles", type: "Purchase", budget: "₹500,000", bhk: "3 BHK" },
  { clientName: "Bob Johnson", location: "Chicago", type: "Rent", budget: "₹1500/month", bhk: "1 BHK" },
  { clientName: "Emma Brown", location: "Houston", type: "Purchase", budget: "₹350,000", bhk: "2 BHK" },
  { clientName: "Michael Lee", location: "Miami", type: "Rent", budget: "₹1800/month", bhk: "Studio" },
  { clientName: "Sophia Wilson", location: "San Francisco", type: "Purchase", budget: "₹800,000", bhk: "4 BHK" },
  { clientName: "David White", location: "Seattle", type: "Rent", budget: "₹2200/month", bhk: "3 BHK" },
  { clientName: "Olivia Miller", location: "Boston", type: "Purchase", budget: "₹600,000", bhk: "3 BHK" },
  { clientName: "William Davis", location: "Denver", type: "Rent", budget: "₹1700/month", bhk: "2 BHK" },
  { clientName: "Ethan Martinez", location: "Dallas", type: "Purchase", budget: "₹450,000", bhk: "2 BHK" },
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Add the Navbar at the top */}
      <Navbar />

      {/* Wrap the rest of the content in AnimatedBackground */}
      <AnimatedBackground className="p-6">
        {/* Centered Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Client Dashboard</h1>
        </div>

        {/* Centered Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="🔍 Search Clients..."
            className="w-full md:w-2/3 lg:w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
          />
        </div>

        {/* Grid Layout for Client Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-8 text-black">
          {clients.map((client, index) => (
            <div key={index} className="w-full p-6 bg-white shadow-lg rounded-xl border border-gray-200 transform transition-transform hover:scale-105">
              <div className="flex items-center space-x-4 mb-4">
                <Building className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-semibold text-grey-500">{client.clientName}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-gray-500" />
                  <p className="text-lg text-gray-700">Location: {client.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="w-6 h-6 text-gray-500" />
                  <p className="text-lg text-gray-700">Type: {client.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-6 h-6 text-gray-500" />
                  <p className="text-lg text-gray-700">Budget: {client.budget}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="w-6 h-6 text-gray-500" />
                  <p className="text-lg text-gray-700">BHK: {client.bhk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedBackground>
    </div>
  );
};

export default Dashboard;