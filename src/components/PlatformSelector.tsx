
import React from 'react';
import { Youtube, Instagram, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Platform = 'youtube' | 'instagram' | 'tiktok';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatform, 
  onPlatformChange 
}) => {
  const platforms = [
    {
      id: 'youtube' as Platform,
      name: 'YouTube',
      icon: Youtube,
      color: 'text-red-500'
    },
    {
      id: 'instagram' as Platform,
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-500'
    },
    {
      id: 'tiktok' as Platform,
      name: 'TikTok',
      icon: Music,
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-in">
      <div className="bg-secondary rounded-2xl p-2 flex items-center justify-between gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={cn(
              'platform-tab flex-1 flex items-center justify-center gap-2 py-3',
              selectedPlatform === platform.id ? 'active' : ''
            )}
            aria-label={`Switch to ${platform.name}`}
          >
            <platform.icon className={cn("platform-icon", platform.color)} />
            <span className="font-medium">{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;
