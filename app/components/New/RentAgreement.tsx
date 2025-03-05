import React, { useState } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { FileText } from "lucide-react";

// Sample rent agreement data (pre-filled for editing)
const initialAgreement = {
  duration: "11 months",
  monthlyRent: "₹25,000",
  deposit: "₹1.5 Lakh",
  agreementType: "Registered Lease"
};

const RentAgreementDetails = () => {
  const [agreement, setAgreement] = useState(initialAgreement);

  const handleChange = (field, value) => {
    setAgreement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SkuemorphicContainer className="w-full h-full p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-white">
        <FileText className="h-6 w-6 text-green-400" />
        <h2 className="text-xl font-semibold">Rent Agreement Details</h2>
      </div>

      <div className="space-y-4">
        {/* Agreement Type */}
        <div className="flex flex-col">
          <label className="text-white opacity-80 mb-1">Agreement Type</label>
          <input 
            type="text"
            value={agreement.agreementType}
            onChange={(e) => handleChange("agreementType", e.target.value)}
            className="p-2 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label className="text-white opacity-80 mb-1">Duration</label>
          <input 
            type="text"
            value={agreement.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="p-2 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Monthly Rent */}
        <div className="flex flex-col">
          <label className="text-white opacity-80 mb-1">Monthly Rent</label>
          <input 
            type="text"
            value={agreement.monthlyRent}
            onChange={(e) => handleChange("monthlyRent", e.target.value)}
            className="p-2 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Deposit Amount */}
        <div className="flex flex-col">
          <label className="text-white opacity-80 mb-1">Deposit</label>
          <input 
            type="text"
            value={agreement.deposit}
            onChange={(e) => handleChange("deposit", e.target.value)}
            className="p-2 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
    </SkuemorphicContainer>
  );
};

export default RentAgreementDetails;
