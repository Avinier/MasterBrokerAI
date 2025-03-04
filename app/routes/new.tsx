import React from 'react';
import OverviewAnalysis from "~/components/New/OverviewAnalysis";
import RealTimeSTT from "~/components/New/RealTimeSTT";
import AIGenVoice from "~/components/New/AIGenVoice";
import PropertyGrid from "~/components/New/PropertyGrid";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NewRoute = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-y-auto px-8 py-6">
      {/* Back Button */}
      <Link to="/home" className="absolute top-4 left-4 z-10">
        <SkuemorphicContainer className="w-20 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-500" />
        </SkuemorphicContainer>
      </Link>
      <div className="flex w-full h-[90%] mt-10 space-x-4 items-stretch" style={{width: '95%'}}>
        <div className="w-1/3 h-full">
          <OverviewAnalysis />
        </div>
        <div className="col-span-1 row-span-2 min-h-[400px]">
          <RealTimeSTT />
        </div>
        <div className="col-span-1 row-span-2 min-h-[400px]">
          <AIGenVoice />
        </div>

        {/* Bottom Left - Two Stacked Elements */}
        <div className="w-[900px] h-[300px]">
          <PropertyGrid />
        </div>

      </div>
    </div>
  );
};

export default NewRoute;
