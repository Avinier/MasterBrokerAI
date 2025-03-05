import React from 'react';
import OverviewAnalysis from "~/components/New/OverviewAnalysis";
import RealTimeSTT from "~/components/New/RealTimeSTT";
import AIGenVoice from "~/components/New/AIGenVoice";
import PropertyGrid from "~/components/New/PropertyGrid";
import RentAgreementGrid from "~/components//New/RentAgreement";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import GenerateLeadsButton from "~/components/New/GenerateLeeds";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NewRoute = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden px-8 py-6">
      {/* Back Button */}
      <Link to="/home" className="absolute top-4 left-4 z-10">
        <SkuemorphicContainer className="w-20 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-500" />
        </SkuemorphicContainer>
      </Link>
      
      {/* Top Row - Three Full-Width Containers */}
      <div className="flex w-full h-[85vh] mt-10 space-x-4">
        <div className="w-1/3 h-full">
          <OverviewAnalysis />
        </div>
        <div className="w-1/3 h-full">
          <RealTimeSTT />
        </div>
        <div className="w-1/3 h-full">
          <AIGenVoice />
        </div>
      </div>
      
      {/* Bottom Row - Two Containers */}
      <div className="flex w-full h-[15%] space-x-4 mt-4">
        <div className="w-[1000px] h-full">
          <PropertyGrid />
        </div>
        <div className="w-1/2 h-[500px] space-x-4 mt-4">
            <div className="w-full h-full bg-white/10 rounded-lg p-4 flex justify-center items-center">
                <GenerateLeadsButton />
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoute;