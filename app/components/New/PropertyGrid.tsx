import React from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

// Sample property data (only first 6 used for 3x2 grid)
const propertyData = [
  {
    bhk: "2 BHK",
    location: "Koramangala, Bangalore",
    estimatedPrice: "₹1.2 Crore",
    image: "/api/placeholder/300/200"
  },
  {
    bhk: "3 BHK",
    location: "Powai, Mumbai",
    estimatedPrice: "₹2.5 Crore",
    image: "/api/placeholder/300/200"
  },
  {
    bhk: "1 BHK",
    location: "Sector 62, Noida",
    estimatedPrice: "₹75 Lakh",
    image: "/api/placeholder/300/200"
  },
  {
    bhk: "4 BHK",
    location: "Jubilee Hills, Hyderabad",
    estimatedPrice: "₹3.8 Crore",
    image: "/api/placeholder/300/200"
  },
  {
    bhk: "2 BHK",
    location: "Indiranagar, Bangalore",
    estimatedPrice: "₹1.8 Crore",
    image: "/api/placeholder/300/200"
  },
  {
    bhk: "3 BHK",
    location: "Andheri, Mumbai",
    estimatedPrice: "₹2.9 Crore",
    image: "/api/placeholder/300/200"
  }
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