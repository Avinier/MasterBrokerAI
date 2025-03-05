import React from "react";
import { Check, X } from "lucide-react";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";

interface Notification {
  id: number;
  text: string;
  time: string;
  hasActions?: boolean;
}

const notifications: Notification[] = [
  { id: 1, text: "🔔 New message received", time: "2m ago" },
  { id: 2, text: "📢 System update available", time: "1h ago" },
  { id: 3, text: "🏡 New property added to your list", time: "3h ago" },
  { id: 4, text: "🤝 New connection request", time: "5h ago", hasActions: true },
  { id: 5, text: "📅 Scheduled meeting at 4 PM", time: "7h ago" },
  { id: 6, text: "🔑 Tenant application pending approval", time: "1d ago", hasActions: true },
];

const NotificationList: React.FC = () => {
  return (
    <div className="max-h-80 w-80 overflow-y-auto space-y-4 p-4">
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <div 
            key={notif.id} 
            className="text-white text-lg opacity-90 border-b border-white/20 pb-3 last:border-b-0 flex justify-between items-center"
          >
            <div>
              {notif.text} <span className="text-sm opacity-70">{notif.time}</span>
            </div>
            {notif.hasActions && (
              <div className="flex space-x-3">
                {/* Accept Button */}
                <SkuemorphicContainer className="w-12 h-12 flex items-center justify-center cursor-pointer">
                  <Check className="text-green-400 w-6 h-6" />
                </SkuemorphicContainer>

                {/* Reject Button */}
                <SkuemorphicContainer className="w-12 h-12 flex items-center justify-center cursor-pointer">
                  <X className="text-red-400 w-6 h-6" />
                </SkuemorphicContainer>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-white text-lg opacity-80">🔔 No new notifications</div>
      )}
    </div>
  );
};

export default NotificationList;
