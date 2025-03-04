import React from 'react';
import OverviewAnalysis from "~/components/New/OverviewAnalysis";
import RealTimeSTT from "~/components/New/RealTimeSTT";
import AIGenVoice from "~/components/New/AIGenVoice";
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NewRoute = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 relative">
      <Link to="/home" className="absolute top-4 left-4">
        <SkuemorphicContainer className="w-20 h-10 flex items-center justify-center">
          <ArrowLeft className="w-6 h-6 text-gray-500" />
        </SkuemorphicContainer>
      </Link>
      <div className="flex w-full h-full space-x-4 items-stretch" style={{width: '95%'}}>
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
    </div>
  );
};

export default NewRoute;
