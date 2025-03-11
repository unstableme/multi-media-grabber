
import React from 'react';
import { ExternalLink, Clock, File } from 'lucide-react';
import { Platform } from './PlatformSelector';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  fileSize: string;
  platform: Platform;
  author?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  title, 
  thumbnail, 
  duration, 
  fileSize, 
  platform,
  author
}) => {
  // Platform-specific styling
  const platformColors = {
    youtube: 'border-red-500/20 bg-red-500/5',
    instagram: 'border-pink-500/20 bg-pink-500/5',
    tiktok: 'border-blue-400/20 bg-blue-400/5'
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 animate-scale-in">
      <div className={cn(
        "glass-panel rounded-xl overflow-hidden border transition-all",
        platformColors[platform]
      )}>
        <div className="relative aspect-video bg-muted/30 overflow-hidden">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover transition-all duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse-subtle">Loading preview...</div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          
          {author && (
            <p className="text-sm text-muted-foreground mt-1">{author}</p>
          )}
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <File className="w-3.5 h-3.5" />
              <span>{fileSize}</span>
            </div>
            
            <a 
              href="#"
              className="ml-auto flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <span>Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
