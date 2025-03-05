import React from "react";
import { User, Bell, Plus } from "lucide-react"; // Import Plus icon
import { Link } from "react-router-dom";
import GlassContainer from "~/components/UI/GlassContainer"; // Update the import

const DashboardNavbar = () => {
  return (
    <GlassContainer
      className="w-full h-20 bg-transparent backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-8"
      isInteractive={false} // Disable interactivity for the navbar container
      style={{ backgroundColor: "transparent" }} // Ensure transparency
    >
      {/* Left: Clickable Brand Name */}
      <Link
        to="/home" // Navigate to the home page
        className="text-black font-subheading text-3xl hover:opacity-80 transition-opacity"
      >
        MasterBroker.AI
      </Link>

      {/* Right: Icons and Add New Client Button */}
      <div className="flex items-center space-x-6">
        {/* Add New Client Button */}
        <Link
          to="/new" // Navigate to the add client page
          className="flex items-center space-x-2 bg-white/15 backdrop-blur-lg rounded-xl border border-white/30 px-4 py-2 hover:bg-white/20 hover:border-white/40 transition-all"
        >
          <Plus className="text-black w-5 h-5" /> {/* Plus icon */}
          <span className="text-black font-semibold">Add New Client</span>
        </Link>

        {/* Notifications */}
        <GlassContainer
          className="w-14 h-14 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "transparent" }} // Ensure transparency
        >
          <Bell className="text-black w-7 h-7" />
        </GlassContainer>

        {/* Profile Icon */}
        <GlassContainer
          className="w-14 h-14 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "transparent" }} // Ensure transparency
        >
          <User className="text-black w-7 h-7" />
        </GlassContainer>
      </div>
    </GlassContainer>
  );
};

export default DashboardNavbar;