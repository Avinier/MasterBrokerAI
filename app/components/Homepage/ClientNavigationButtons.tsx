import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Plus, Users } from 'lucide-react';

const ClientNavigationButtons = () => {
  return (
    <div className="flex space-x-4 w-full">
      <motion.div
        className="w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/new"
          className="block"
        >
          <button
            className={`
              relative
              w-full
              px-6
              py-3
              rounded-2xl
              bg-white/15
              border
              border-white/20
              text-grey
              font-subheading
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-500
              group
              overflow-hidden
              shadow-[0_10px_25px_-10px_rgba(255,255,255,0.1),_inset_0_2px_4px_rgba(255,255,255,0.1)]
              hover:shadow-[0_15px_30px_-12px_rgba(255,255,255,0.2),_inset_0_4px_6px_rgba(255,255,255,0.2)]
            `}
          >
            {/* Gradient Overlay */}
            <div 
              className="
                absolute 
                inset-0 
                bg-gradient-to-r 
                from-[#E98AF0]/30 
                via-[#8A8FF0]/30 
                to-[#8AF096]/30 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-500 
                -z-10
                animate-gradient-x
              "
            />

            {/* Hover Gradient */}
            <div 
              className="
                absolute 
                inset-0 
                bg-gradient-to-r 
                from-[#E0AAFF] 
                via-[#C0ADFF] 
                to-[#A0B5FF] 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-500 
                -z-20
                blur-md
              "
            />

            <Plus 
              className="
                w-5 
                h-5 
                text-grey 
                drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]
                group-hover:rotate-90
                transition-transform
                duration-300
              "
            />
            Add New Client
          </button>
        </Link>
      </motion.div>

      <motion.div
        className="w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          to="/dashboard"
          className="block"
        >
          <button
            className={`
              relative
              w-full
              px-6
              py-3
              rounded-2xl
              bg-white/15
              border
              border-white/20
              text-grey
              font-subheading
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-500
              group
              overflow-hidden
              shadow-[0_10px_25px_-10px_rgba(255,255,255,0.1),_inset_0_2px_4px_rgba(255,255,255,0.1)]
              hover:shadow-[0_15px_30px_-12px_rgba(255,255,255,0.2),_inset_0_4px_6px_rgba(255,255,255,0.2)]
            `}
          >
            {/* Gradient Overlay */}
            <div 
              className="
                absolute 
                inset-0 
                bg-gradient-to-r 
                from-[#8AF096]/30 
                via-[#E98AF0]/30 
                to-[#8A8FF0]/30 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-500 
                -z-10
                animate-gradient-x
              "
            />

            {/* Hover Gradient */}
            <div 
              className="
                absolute 
                inset-0 
                bg-gradient-to-r 
                from-[#E0AAFF] 
                via-[#C0ADFF] 
                to-[#A0B5FF] 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-500 
                -z-20
                blur-md
              "
            />

            <Users 
              className="
                w-5 
                h-5 
                text-grey 
                drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]
                group-hover:scale-110
                transition-transform
                duration-300
              "
            />
            Existing Clients
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ClientNavigationButtons;