
import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DownloadButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onClick, 
  isLoading,
  isDisabled
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
      <button
        onClick={onClick}
        disabled={isDisabled || isLoading}
        className={cn(
          "w-full glass-panel py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-medium button-animation",
          isDisabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg",
          !isDisabled && !isLoading && "bg-primary text-primary-foreground"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing Download...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Video</span>
          </>
        )}
      </button>
      <p className="text-xs text-center mt-2 text-muted-foreground">
        Your download will start automatically
      </p>
    </div>
  );
};

export default DownloadButton;
