import React from "react";
import { User, Bell } from "lucide-react";
import { Link } from "@remix-run/react";
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
        to="/dashboard"
        className="text-black font-subheading text-3xl hover:opacity-80 transition-opacity"
      >
        MasterBroker.AI
      </Link>

      {/* Right: Icons inside Glass Containers */}
      <div className="flex items-center space-x-6">
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