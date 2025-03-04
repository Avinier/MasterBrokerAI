import React from "react";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import AnimatedBackground from "~/components/UI/AnimatedBackground";
import GlowingInput from "~/components/UI/GlowingInput";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatedBackground>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to CyberCypher
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Manage your clients with ease.
          </p>
          <GlowingInput placeholder="Search clients..." className="w-64 mx-auto mb-8" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Link to="/dashboard">Add New Client</Link>
          </motion.button>
        </div>
      </AnimatedBackground>
    </div>
  );
}
