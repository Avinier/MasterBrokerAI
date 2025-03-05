import React from "react";
import { Bell, User } from "lucide-react";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";

const Navbar = () => {
  return (
    <SkuemorphicContainer className="w-full flex items-center justify-between px-6 py-4">
      {/* Left: Brand Name */}
      <h1 className="text-white text-2xl font-bold font-tiempos-heading">
        MasterBroker.AI
      </h1>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell */}
        <button className="relative hover:scale-110 transition-transform duration-200">
          <Bell className="text-white w-6 h-6" />
        </button>

        {/* Profile Icon */}
        <button className="hover:scale-110 transition-transform duration-200">
          <User className="text-white w-6 h-6" />
        </button>
      </div>
    </SkuemorphicContainer>
  );
};

export default Navbar;
