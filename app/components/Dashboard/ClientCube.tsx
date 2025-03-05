import React from "react";

export interface ClientCubeProps {
  clientName: string;
  location: string;
  type: "Rent" | "Purchase"; // Enforce correct types
  budget: string;
  bhk: string;
}

const ClientCube: React.FC<ClientCubeProps> = ({ clientName, location, type, budget, bhk }) => {
  return (
    <div className="w-80 p-4 bg-white shadow-md rounded-lg border border-gray-500">
      <h3 className="text-lg font-semibold text-grey-500">{clientName}</h3>
      <p className="text-sm text-gray-500">Location: {location}</p>
      <p className="text-sm text-gray-500">Type: {type}</p>
      <p className="text-sm text-gray-500">Budget: {budget}</p>
      <p className="text-sm text-gray-500">BHK: {bhk}</p>
    </div>
  );
};

export default ClientCube;
