import React, { useState } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, StopCircle, PlayCircle } from "lucide-react";

const RealTimeSTT = () => {
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Mumbai Realty AI. How can I assist you today?", sender: 'assistant' },
    { id: 2, text: "I'm looking for a 3BHK in South Mumbai with sea view.", sender: 'user' }
  ]);

  const handlePhoneClick = () => {
    setIsPhoneClicked(true);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <SkuemorphicContainer className="w-full h-full flex items-center justify-center relative bg-gray-900">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 animate-pulse blur-2xl" />
      
      {isPhoneClicked && (
  <div className="flex flex-col items-center justify-center w-full h-full relative z-10">
    <div className="text-center space-y-2 mb-4">
      <h2 className='text-3xl font-bold font-subheading bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent'>
        Live Conversation Analysis
      </h2>
      <p className="text-gray-400 font-subheading">Real-time client communication</p>
    </div>

    <div className="w-full px-4 overflow-y-auto max-h-[calc(100%-150px)]">
      <AnimatePresence>
        {isRecording && (
          <div className="flex flex-col items-start w-full z-10">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 100 
                }}
                className={`
                  flex 
                  ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
                  w-full
                  mb-4
                `}
              >
                <div
                  className={`
                    relative 
                    w-full
                    rounded-xl 
                    p-4 
                    transition-all 
                    duration-300 
                    ${message.sender === 'assistant' 
                      ? 'bg-gradient-to-br from-cyan-500 via-emerald-500 to-emerald-400 animate-pulse-glow-cyan' 
                      : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500'}
                    text-white 
                    shadow-xl 
                    hover:scale-[1.01] 
                    transform 
                    ease-in-out
                    font-subheading 
                    tracking-wide 
                  `}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>

    <div className="absolute bottom-0 flex space-x-4 mb-8 z-10">
      <motion.button
        onClick={handleStartRecording}
        disabled={isRecording}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          relative rounded-full h-12 w-12 flex items-center justify-center shadow-md hover:shadow-lg
          ${isRecording 
            ? 'bg-cyan-300 cursor-not-allowed opacity-50' 
            : 'bg-cyan-500 hover:bg-cyan-600'
          }
        `}
      >
        <div className={`
          absolute inset-0 rounded-full 
          ${isRecording 
            ? 'bg-cyan-300 opacity-30' 
            : 'bg-cyan-400 opacity-50 blur-xl animate-pulse'
          }
        `}></div>
        <PlayCircle className={`
          text-white h-6 w-6 relative z-10
          ${isRecording ? 'opacity-50' : ''}
        `} />
      </motion.button>

      <motion.button
        onClick={handleStopRecording}
        disabled={!isRecording}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`
          relative rounded-full h-12 w-12 flex items-center justify-center shadow-md hover:shadow-lg
          ${!isRecording 
            ? 'bg-emerald-300 cursor-not-allowed opacity-50' 
            : 'bg-emerald-500 hover:bg-emerald-600'
          }
        `}
      >
        <div className={`
          absolute inset-0 rounded-full 
          ${!isRecording 
            ? 'bg-emerald-300 opacity-30' 
            : 'bg-emerald-400 opacity-50 blur-xl animate-pulse'
          }
        `}></div>
        <StopCircle className={`
          text-white h-6 w-6 relative z-10
          ${!isRecording ? 'opacity-50' : ''}
        `} />
      </motion.button>
    </div>
  </div>
)}

      {/* <AnimatePresence>
        {isRecording && (
          <div className="flex flex-col items-start mt-4 w-full px-4 z-10">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 100 
                }}
                className={`
                  flex 
                  ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
                  w-full
                  mb-4
                `}
              >
                <div
                  className={`
                    relative 
                    max-w-[80%] 
                    rounded-xl 
                    p-4 
                    transition-all 
                    duration-300 
                    ${message.sender === 'assistant' 
                      ? 'bg-gradient-to-br from-cyan-500 via-emerald-500 to-emerald-400 animate-pulse-glow-cyan' 
                      : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500'}
                    text-white 
                    shadow-xl 
                    hover:scale-[1.01] 
                    transform 
                    ease-in-out
                    font-subheading 
                    tracking-wide 
                  `}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence> */}
    </SkuemorphicContainer>
  );
};

export default RealTimeSTT;
