
import React, { useState, useEffect } from 'react';
import { Loader2, X, Link as LinkIcon } from 'lucide-react';
import { Platform } from './PlatformSelector';
import { cn } from '@/lib/utils';

interface UrlInputProps {
  platform: Platform;
  onUrlChange: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ 
  platform, 
  onUrlChange,
  isLoading
}) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Reset the URL when platform changes
  useEffect(() => {
    setUrl('');
    setError(null);
  }, [platform]);

  const validateUrl = (input: string): boolean => {
    if (!input.trim()) {
      setError('Please enter a URL');
      return false;
    }

    const patterns = {
      youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i,
      instagram: /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+/i,
      tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+/i
    };

    if (!patterns[platform].test(input)) {
      setError(`Invalid ${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (newUrl.trim() === '') {
      setError(null);
    } else if (error) {
      validateUrl(newUrl);
    }
  };

  const handleSubmit = () => {
    if (validateUrl(url)) {
      onUrlChange(url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setTimeout(() => validateUrl(text), 0);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const clearUrl = () => {
    setUrl('');
    setError(null);
  };

  let placeholderText = 'Enter URL...';
  if (platform === 'youtube') placeholderText = 'Paste YouTube video URL...';
  if (platform === 'instagram') placeholderText = 'Paste Instagram video URL...';
  if (platform === 'tiktok') placeholderText = 'Paste TikTok video URL...';

  return (
    <div className="w-full max-w-xl mx-auto mt-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
      <div className="relative">
        <div className={cn(
          "glass-panel rounded-xl flex items-center overflow-hidden transition-all duration-300 border",
          error ? "border-destructive" : "border-input focus-within:border-primary/50",
          isLoading ? "opacity-50" : "opacity-100"
        )}>
          <div className="pl-4 text-muted-foreground">
            <LinkIcon className="w-5 h-5" />
          </div>
          
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className="w-full py-4 px-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50"
            disabled={isLoading}
          />
          
          {url ? (
            <button 
              onClick={clearUrl}
              className="p-2 mr-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear input"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handlePaste}
              className="px-3 py-1.5 mr-2 text-xs font-medium text-muted-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              aria-label="Paste from clipboard"
              disabled={isLoading}
            >
              Paste
            </button>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-destructive mt-2 ml-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default UrlInput;
