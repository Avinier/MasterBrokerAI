import Navbar from '~/components/UI/NavBar';
import OverviewAnalysis from '~/components/New/OverviewAnalysis';
import RealTimeSTT from '~/components/New/RealTimeSTT';
import AIGenVoice from '~/components/New/AIGenVoice';
import PropertyGrid from '~/components/New/PropertyGrid';
import Map from '~/components/New/Map';
import SkuemorphicContainer from '~/components/UI/SkuemorphicContainer';

const NewRoute = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-[#1d0430] to-[#03123d] relative overflow-hidden min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="px-8 py-6 mt-4">
        {/* Top Row - Three Full-Width Containers */}
        <div className="flex w-full h-[85vh] space-x-4">
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
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoute;
