import React, { useState } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mic } from "lucide-react";

const RealTimeSTT = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how can I help you today?", sender: 'assistant' },
    { id: 2, text: "I need assistance with my account.", sender: 'user' }
  ]);

  const handleRecord = () => {
    setIsRecording(true);
  };

  return (
    <SkuemorphicContainer className="w-full h-full flex items-center justify-center">
      <AnimatePresence>
        {!isRecording && (
          <motion.button 
            onClick={handleRecord}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute"
          >
            <motion.div
              className="relative rounded-full bg-green-400 h-24 w-24 flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-200 opacity-75 blur-lg animate-pulse"></div>
              <Mic className="text-portage h-12 w-12 relative" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRecording && (
          <div className="flex flex-col items-start mt-4">
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
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative 
        max-w-[80%] 
        rounded-xl 
        p-4 
        transition-all 
        duration-300 
        ${message.sender === 'assistant' 
          ? 'bg-gradient-to-br from-[#C552D6] via-[#E98AF0] to-[#F0A8F8]' 
          : 'bg-gradient-to-br from-[#4AE05A] via-[#8AF096] to-[#B0F5C0]'}
        text-white 
        shadow-xl 
        hover:scale-[1.01] 
        transform 
        ease-in-out
        ${message.sender === 'assistant' 
          ? 'ring-[#E98AF0] hover:ring-[#FF60F6]' 
          : 'ring-[#8AF096] hover:ring-[#60FF84]'}
        font-subheading 
        tracking-wide 
        animate-pulse
      `}
    >
      {message.text}
    </div>
  </motion.div>

            ))}

            
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRecording && (
          <motion.div
            className="absolute bottom-0 rounded-full bg-green-400 h-16 w-16 flex items-center justify-center shadow-lg" // Removed mt-4, added absolute bottom-0
            animate={{
              y: [0, 'calc(50% - 2rem)'], // Animate downwards to the center, adjusting for icon size
              scale: [1, 0.8],
              opacity: [0.8, 1],
            }}
            transition={{
              duration: 0.5, // Reduced duration
              repeat: 0, // Remove repetition
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-200 opacity-75 blur-lg animate-pulse"></div>
            <Phone className="text-portage h-8 w-8 relative" />
          </motion.div>
        )}
      </AnimatePresence>
    </SkuemorphicContainer>
  );
};

export default RealTimeSTT;
