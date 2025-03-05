import React, { useEffect, useRef, useState } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { Loader2 } from 'lucide-react';

const AIGenVoice = () => {
  const siriWaveContainer = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const siriWave = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 120000);

        let siriWaveInstance: any;
        const initSiriWave = async () => {
            if (siriWaveContainer.current && !siriWave.current) {
                const SiriWave = await import('siriwave');
                siriWaveInstance = new SiriWave.default({
                    container: siriWaveContainer.current,
                    width: 400,
                    height: 200,
                    style: 'ios9',
                    color: '#8B5CF6',
                    amplitude: 0.8,
                    speed: 0.15,
                    frequency: 4
                });
                siriWave.current = siriWaveInstance;
            }
        };

        initSiriWave();
        return () => clearTimeout(timer)
    }, []);

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // Add your voice generation/recording logic here
  };

  return (
    <SkuemorphicContainer className="w-full h-full flex items-center justify-center flex-col bg-gray-900 p-8 relative overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse blur-2xl" />
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="text-purple-400 h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="z-10 w-full max-w-3xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className='text-4xl font-bold font-subheading bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
              AI Voice Generation
            </h2>
            <p className="text-gray-400 font-subheading">Talk to your clients automatically</p>
          </div>

          {/* Visualization Container */}
          <div className="relative w-full aspect-video bg-gray-800 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <div ref={siriWaveContainer} className="w-full h-full" />
          </div>
        </div>
      )}
    </SkuemorphicContainer>
  );
};

export default AIGenVoice;
