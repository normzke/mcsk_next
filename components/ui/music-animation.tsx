import React from 'react';

interface MusicAnimationProps {
  className?: string;
}

const MusicAnimation: React.FC<MusicAnimationProps> = ({ className = '' }) => {
  return (
    <div className={`absolute pointer-events-none z-10 w-full h-full overflow-hidden ${className}`}>
      {/* Musical notes floating around */}
      <div className="absolute top-1/4 left-1/5 animate-float-slow opacity-70">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M9 17H5v-2h4v2zm0-4H5v-2h4v2zm0-4H5V7h4v2zm10 4h-4v-2h4v2zm0-4h-4V7h4v2zm0 8h-4v-2h4v2zm-5 4H5v-2h9v2zm0-4H5v-2h9v2zm0-4H5v-2h9v2zm0-4H5V7h9v2z"/>
        </svg>
      </div>
      
      <div className="absolute top-1/3 right-1/4 animate-float-medium opacity-60">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 animate-float-fast opacity-80">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>
      
      <div className="absolute top-2/3 right-1/5 animate-float-slow opacity-70">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M9 17H5v-2h4v2zm0-4H5v-2h4v2zm0-4H5V7h4v2zm10 4h-4v-2h4v2zm0-4h-4V7h4v2zm0 8h-4v-2h4v2zm-5 4H5v-2h9v2zm0-4H5v-2h9v2zm0-4H5v-2h9v2zm0-4H5V7h9v2z"/>
        </svg>
      </div>
      
      {/* Sound wave animation at the bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
        {[...Array(7)].map((_, i) => (
          <div 
            key={i} 
            className="w-2 bg-white/50 rounded-t-full animate-sound-wave" 
            style={{ 
              height: '10px',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicAnimation;
