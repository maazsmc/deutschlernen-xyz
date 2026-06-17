import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  // Compute text sizes
  const titleSize = 
    size === "sm" 
      ? "text-xl" 
      : size === "lg" 
      ? "text-4xl sm:text-5xl" 
      : "text-3xl sm:text-4xl";

  const subtextSize = 
    size === "sm" 
      ? "text-[9px]" 
      : size === "lg" 
      ? "text-xs sm:text-sm" 
      : "text-[10px] sm:text-[11px] md:text-xs";

  const lineThickness = 
    size === "sm" 
      ? "h-[2px]" 
      : size === "lg" 
      ? "h-[3px]" 
      : "h-[2.5px]";

  return (
    <div className={`flex flex-col select-none font-sans items-center justify-center ${className}`} id="german_hub_custom_logo">
      {/* Title Text */}
      <div className={`font-black tracking-tight leading-none flex items-baseline justify-center ${titleSize}`}>
        <span className="text-[#202020] font-black">German</span>
        <span className="text-[#D51F26] font-black ml-1.5">Hub</span>
      </div>
      
      {/* Subtitle with Left Black Line, slogan and Right Gold Line */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 w-full max-w-sm">
        {/* Thick black line */}
        <div className={`flex-grow ${lineThickness} bg-[#202020] min-w-[12px] sm:min-w-[20px] max-w-[48px] sm:max-w-[64px] rounded-full`}></div>
        
        {/* Interactive typography message */}
        <span className={`font-bold text-slate-800 tracking-wider whitespace-nowrap uppercase shrink-0 ${subtextSize}`}>
          Learn German. Connect. Grow.
        </span>
        
        {/* Thick yellow/gold line */}
        <div className={`flex-grow ${lineThickness} bg-[#FF9900] min-w-[12px] sm:min-w-[20px] max-w-[48px] sm:max-w-[64px] rounded-full`}></div>
      </div>
    </div>
  );
};
