import React from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const RealTimeSTT = () => {
  return (
    <SkuemorphicContainer className="w-full h-full flex items-center justify-center">
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
        <Phone className="text-portage h-12 w-12 relative" />
      </motion.div>
    </SkuemorphicContainer>
  );
};

export default RealTimeSTT;
