import React, { useEffect, useRef, useState } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { Loader2 } from 'lucide-react';

const AIGenVoice = () => {
  const siriWaveContainer = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const siriWave = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false); // New state

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
  };

  const handlePlayAudio = () => {
    console.log("Play audio button clicked!"); // Debugging

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.error("audioRef.current is null!"); // Debugging
    }
  };

  const handleAudioLoadedData = () => {
    setAudioLoaded(true);
  }

  return (
    <SkuemorphicContainer className="w-full h-full flex items-center justify-center flex-col bg-gray-900 p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse blur-2xl" />

      <div className="z-10 w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className='text-4xl font-bold font-subheading bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
            AI Voice Generation
          </h2>
          <p className="text-gray-400 font-subheading">Talk to your clients automatically</p>
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

        <div className="relative w-full aspect-video bg-gray-800 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
          <div ref={siriWaveContainer} className="w-full h-full" />
        </div>

        {/* Play Audio Button */}
        <button
          onClick={handlePlayAudio}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-300 z-10"
          disabled={!audioLoaded} // Disable button until audio is loaded
        >
          {isPlaying ? "Pause Audio" : "Play Audio"}
        </button>

        {/* Audio Element (Hidden) */}
        <audio
          ref={audioRef}
          src="/audio/your_audio_file.mp3"
          preload="auto"
          onEnded={() => setIsPlaying(false)}
          onLoadedData={handleAudioLoadedData} // Set audioLoaded to true
        />
      </div>
    </SkuemorphicContainer>
  );
};

export default AIGenVoice;
