import React from "react";
import { User } from "lucide-react";
import { Link } from "@remix-run/react";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import NotificationMenu from "~/components/UI/NotificationMenu"; // Import the Notification Component

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-white/15 border-b border-white/20 flex items-center justify-between px-8 shadow-[0_10px_25px_-10px_rgba(255,255,255,0.1)]">
      {/* Left: Clickable Brand Name */}
      <Link to="/home" className="text-white text-2xl font-subheading hover:opacity-80 transition-opacity">
        MasterBroker.AI
      </Link>

      {/* Right: Icons inside Skeuomorphic Containers */}
      <div className="flex items-center space-x-8">
        {/* Notification Menu */}
        <NotificationMenu />

        {/* Profile Icon */}
        <SkuemorphicContainer className="w-12 h-12 flex items-center justify-center cursor-pointer">
          <User className="text-white w-6 h-6" />
        </SkuemorphicContainer>
      </div>
    </div>
  );
};

export default Navbar;
