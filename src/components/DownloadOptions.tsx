
import React from 'react';
import { Check } from 'lucide-react';
import { Platform } from './PlatformSelector';
import { cn } from '@/lib/utils';

export type Quality = '4k' | '1080p' | '720p' | '480p' | '360p' | 'audio';

interface QualityOption {
  value: Quality;
  label: string;
  description: string;
}

interface DownloadOptionsProps {
  platform: Platform;
  selectedQuality: Quality;
  onQualityChange: (quality: Quality) => void;
  availableQualities: Quality[];
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ 
  platform,
  selectedQuality, 
  onQualityChange,
  availableQualities
}) => {
  // Complete list of potential quality options
  const qualityOptions: QualityOption[] = [
    { 
      value: '4k', 
      label: '4K', 
      description: 'Ultra HD (3840×2160)'
    },
    { 
      value: '1080p', 
      label: '1080p', 
      description: 'Full HD (1920×1080)'
    },
    { 
      value: '720p', 
      label: '720p', 
      description: 'HD (1280×720)'
    },
    { 
      value: '480p', 
      label: '480p', 
      description: 'SD (854×480)'
    },
    { 
      value: '360p', 
      label: '360p', 
      description: 'Low (640×360)'
    },
    { 
      value: 'audio', 
      label: 'Audio', 
      description: 'MP3 audio only'
    }
  ];

  // Filter to only show available qualities
  const options = qualityOptions.filter(option => 
    availableQualities.includes(option.value)
  );

  return (
    <div className="w-full max-w-xl mx-auto mt-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
      <div className="glass-panel rounded-xl p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Select Quality</h3>
        
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onQualityChange(option.value)}
              className={cn(
                "relative p-3 rounded-lg border transition-all duration-300 text-left",
                selectedQuality === option.value 
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/30 hover:bg-secondary"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </div>
                
                {selectedQuality === option.value && (
                  <div className="rounded-full bg-primary text-primary-foreground p-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadOptions;
