import React from 'react';

interface SkuemorphicContainerProps {
  children: React.ReactNode;
  className?: string;
}

const SkuemorphicContainer: React.FC<SkuemorphicContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`
        relative
        rounded-2xl
        border
        border-white/20
        overflow-hidden
        shadow-[0_10px_25px_-10px_rgba(255,255,255,0.1),_inset_0_2px_4px_rgba(255,255,255,0.1)]
        ${className || ''}
        p-4
        transition-all
        duration-300
        hover:shadow-[0_15px_30px_-12px_rgba(255,255,255,0.2),_inset_0_4px_6px_rgba(255,255,255,0.2)]
      `}
    >
      {children}
    </div>
  );
};

export default SkuemorphicContainer;
