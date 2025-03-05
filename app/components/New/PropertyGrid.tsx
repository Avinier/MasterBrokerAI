import React from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const propertyData = [
  {
    bhk: "2 BHK",
    location: "Andheri, Mumbai",
    estimatedPrice: "₹1.05 Crore",
    image: "/images/test.jpg",
  },
  {
    bhk: "3 BHK",
    location: "Powai, Mumbai",
    estimatedPrice: "₹1.2 Crore",
    image: "/images/powai.jpg",
  },
  {
    bhk: "1 BHK",
    location: "Bandra, Mumbai",
    estimatedPrice: "₹1.1 Crore",
    image: "/images/bandra.jpg",
  },
  {
    bhk: "2 BHK",
    location: "Worli, Mumbai",
    estimatedPrice: "₹1.39 Crore",
    image: "/images/worli.jpg",
  },
  {
    bhk: "3 BHK",
    location: "Juhu, Mumbai",
    estimatedPrice: "₹1.4 Crore",
    image: "/images/juhu.jpg",
  },
  {
    bhk: "1 BHK",
    location: "Chembur, Mumbai",
    estimatedPrice: "₹1.25 Crore",
    image: "/images/chembhue.jpg",
  },
  {
    bhk: "2 BHK",
    location: "Kandivali, Mumbai",
    estimatedPrice: "₹1.15 Crore",
    image: "/images/test.jpg",
  },
  {
    bhk: "3 BHK",
    location: "Borivali, Mumbai",
    estimatedPrice: "₹1.3 Crore",
    image: "/images/test.jpg",
  },
];


const PropertyGridItem = ({ bhk, location, estimatedPrice, image }) => {
  return (
    <SkuemorphicContainer className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-900 relative overflow-hidden">
      {/* Yellow glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 animate-pulse blur-lg" />
      
      <motion.div
        className="relative rounded-xl bg-yellow-400 w-full aspect-video flex items-center justify-center mb-4 overflow-hidden"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-200 opacity-75 blur-lg"></div>
        <img 
          src={image} 
          alt="Property" 
          className="relative z-10 w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-2 right-2 bg-white/30 backdrop-blur-sm rounded-full p-2">
          <Home className="text-white h-6 w-6" />
        </div>
      </motion.div>
      
      <div className="w-full text-white text-center z-10">
        <h3 className="text-xl font-semibold mb-1 font-subheading">{bhk}</h3>
        <p className="text-sm opacity-80 mb-1 font-subheading">{location}</p>
        <p className="text-lg font-bold text-yellow-600 font-subheading">{estimatedPrice}</p>
      </div>
    </SkuemorphicContainer>
  );
};

const PropertyGrid = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
      {propertyData.slice(0, 6).map((property, index) => (
        <PropertyGridItem 
          key={index}
          bhk={property.bhk}
          location={property.location}
          estimatedPrice={property.estimatedPrice}
          image={property.image}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;