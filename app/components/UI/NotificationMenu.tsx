import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import NotificationList from "~/components/UI/NotificationList";

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Notification Bell Button */}
      <div onClick={toggleMenu} className="cursor-pointer">
        <SkuemorphicContainer className="w-16 h-16 flex items-center justify-center">
          <Bell className="text-white w-8 h-8" />
        </SkuemorphicContainer>
      </div>

      {/* Dropdown Menu - Increased Width */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg p-5 space-y-3 z-50">
          <p className="text-white text-xl font-semibold">Notifications</p>
          <NotificationList />
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
