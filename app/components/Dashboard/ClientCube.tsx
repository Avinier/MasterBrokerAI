import React from "react";
import GlassContainer from "~/components/UI/GlassContainer";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";

export interface ClientCubeProps {
  clientName: string;
  location: string;
  type: "Rent" | "Purchase";
  budget: string;
  bhk: string;
}

const ClientCube: React.FC<ClientCubeProps> = ({ 
  clientName, 
  location, 
  type, 
  budget, 
  bhk 
}) => {
  return (
    <SkuemorphicContainer
      className="w-80 p-6 rounded-xl text-subheading border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all bg-transparent"
    >
      {/* <GlassContainer
        className="p-4 rounded-lg border border-white/20 bg-transparent"
        isInteractive={false}
        style={{ 
          backgroundColor: "transparent", 
          backdropFilter: "blur(5px)", 
          background: "rgba(255, 255, 255, 0.05)"
        }}
      > */}
        <h3 className="text-lg font-semibold text-gray-700">{clientName}</h3>
        <p className="text-sm text-gray-600">
          <span className={`font-semibold ${type === "Rent" ? "text-blue-500" : "text-green-500"}`}>
            {type}
          </span>
        </p>
        <p className="text-sm text-gray-600">💰 Budget: {budget}</p>
        <p className="text-sm text-gray-600">🛏 BHK: {bhk}</p>
    </SkuemorphicContainer>
  );
};

export default ClientCube;
