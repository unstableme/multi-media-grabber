import React, { useState } from 'react';
import Header from '@/components/Header';
import PlatformSelector, { Platform } from '@/components/PlatformSelector';
import UrlInput from '@/components/UrlInput';
import DownloadOptions, { Quality } from '@/components/DownloadOptions';
import DownloadButton from '@/components/DownloadButton';
import VideoCard from '@/components/VideoCard';
import { fetchVideoData, downloadVideo } from '@/lib/videoUtils';
import { toast } from 'sonner';

const Index = () => {
  // State management
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [selectedQuality, setSelectedQuality] = useState<Quality>('1080p');
  
  // Handle platform change
  const handlePlatformChange = (newPlatform: Platform) => {
    if (platform !== newPlatform) {
      setPlatform(newPlatform);
      setVideoData(null);
      setUrl('');
    }
  };
  
  // Handle URL change and fetch video data
  const handleUrlChange = async (newUrl: string) => {
    setUrl(newUrl);
    setLoading(true);
    setVideoData(null);
    
    try {
      const data = await fetchVideoData(newUrl, platform);
      setVideoData(data);
      
      // Set a default quality
      if (data.availableQualities.length > 0) {
        // Prefer 1080p if available, otherwise take the highest quality
        const defaultQuality = data.availableQualities.includes('1080p')
          ? '1080p'
          : data.availableQualities[0];
        setSelectedQuality(defaultQuality);
      }
      
      toast.success("Video information retrieved successfully");
    } catch (error) {
      console.error('Error fetching video data:', error);
      toast.error("Error retrieving video information");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle quality change
  const handleQualityChange = (quality: Quality) => {
    setSelectedQuality(quality);
  };
  
  // Handle download
  const handleDownload = async () => {
    if (!url || !videoData) return;
    
    setDownloading(true);
    
    try {
      await downloadVideo(url, platform, selectedQuality);
      toast.success("Download completed successfully!");
    } catch (error) {
      console.error('Error downloading video:', error);
      toast.error("Error during download. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      <Header />
      
      <main className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
            Download videos from multiple platforms
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            Download All Videos in <span className="text-primary">One Place</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Download videos from YouTube, Instagram, and TikTok in different quality options. Simple, fast, and user-friendly.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <PlatformSelector 
            selectedPlatform={platform} 
            onPlatformChange={handlePlatformChange} 
          />
          
          <UrlInput 
            platform={platform} 
            onUrlChange={handleUrlChange} 
            isLoading={loading} 
          />
          
          {videoData && (
            <>
              <VideoCard 
                title={videoData.title}
                thumbnail={videoData.thumbnail}
                duration={videoData.duration}
                fileSize={videoData.fileSize}
                platform={platform}
                author={videoData.author}
              />
              
              <DownloadOptions 
                platform={platform}
                selectedQuality={selectedQuality}
                onQualityChange={handleQualityChange}
                availableQualities={videoData.availableQualities}
              />
            </>
          )}
          
          <DownloadButton 
            onClick={handleDownload}
            isLoading={downloading}
            isDisabled={!videoData || loading}
          />
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 pt-16 border-t border-border">
          <section id="features" className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-xl">
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <polyline points="8 17 12 21 16 17" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-2">Multiple Platforms</h4>
                <p className="text-muted-foreground text-sm">Download videos from YouTube, Instagram, and TikTok with a single tool.</p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 3v14" />
                    <path d="m17 8-5-5-5 5" />
                    <path d="M8 21H16" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-2">Quality Options</h4>
                <p className="text-muted-foreground text-sm">Choose from multiple quality options, from 4K down to audio-only.</p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 10-4 4-4-4" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-2">Fast & Simple</h4>
                <p className="text-muted-foreground text-sm">Easy to use interface with quick download processing.</p>
              </div>
            </div>
          </section>
          
          <section id="how-it-works" className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
            <div className="glass-panel p-6 rounded-xl">
              <ol className="relative border-l border-border">
                <li className="mb-8 ml-6">
                  <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</div>
                  <h4 className="flex items-center mb-2 text-lg font-medium">Choose Platform</h4>
                  <p className="text-muted-foreground">Select the platform from the options: YouTube, Instagram, or TikTok.</p>
                </li>
                <li className="mb-8 ml-6">
                  <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</div>
                  <h4 className="flex items-center mb-2 text-lg font-medium">Paste URL</h4>
                  <p className="text-muted-foreground">Copy the video URL from your browser and paste it into the input field.</p>
                </li>
                <li className="mb-8 ml-6">
                  <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</div>
                  <h4 className="flex items-center mb-2 text-lg font-medium">Select Quality</h4>
                  <p className="text-muted-foreground">Choose your preferred quality from the available options.</p>
                </li>
                <li className="ml-6">
                  <div className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">4</div>
                  <h4 className="flex items-center mb-2 text-lg font-medium">Download</h4>
                  <p className="text-muted-foreground">Click the download button and wait for your video to be processed and downloaded.</p>
                </li>
              </ol>
            </div>
          </section>
          
          <section id="faq" className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-2">Is this service free?</h4>
                <p className="text-muted-foreground">Yes, our basic service is completely free to use. We offer premium options for higher quality downloads and additional features.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-2">Is it legal to download videos?</h4>
                <p className="text-muted-foreground">Downloading videos for personal use is generally acceptable. However, redistributing copyrighted content without permission is not legal.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-lg font-medium mb-2">Why can't I download some videos?</h4>
                <p className="text-muted-foreground">Some videos might be protected or restricted by the platform. Additionally, private or age-restricted content may not be accessible.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-secondary/50 py-8 border-t border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VideoGrab. All rights reserved. 
              This service is for personal use only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
