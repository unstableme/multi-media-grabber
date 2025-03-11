
import { Platform } from '@/components/PlatformSelector';
import { Quality } from '@/components/DownloadOptions';

interface VideoData {
  title: string;
  thumbnail: string;
  duration: string;
  fileSize: string;
  author?: string;
  availableQualities: Quality[];
}

// Helper to format the duration from seconds to MM:SS format
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Helper to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper to extract video ID from different platforms
const extractVideoId = (url: string, platform: Platform): string | null => {
  let match;
  
  switch (platform) {
    case 'youtube':
      // Handle youtube.com/watch?v=VIDEO_ID
      match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
      return match ? match[1] : null;
      
    case 'instagram':
      // Handle instagram.com/p/CODE/ or instagram.com/reel/CODE/
      match = url.match(/instagram\.com\/(?:p|reel|tv)\/([^\/]+)/);
      return match ? match[1] : null;
      
    case 'tiktok':
      // Handle tiktok.com/@username/video/VIDEO_ID
      match = url.match(/tiktok\.com\/(?:@[^\/]+\/video\/|v\/)(\d+)/);
      return match ? match[1] : null;
      
    default:
      return null;
  }
};

// This function simulates getting the actual video title and thumbnail based on your URL
// In a real app with a backend, this would actually fetch the true information
export const fetchVideoData = async (url: string, platform: Platform): Promise<VideoData> => {
  const videoId = extractVideoId(url, platform);
  
  if (!videoId) {
    throw new Error(`Invalid ${platform} URL format`);
  }
  
  console.log(`Fetching video data for ${platform} video with ID: ${videoId}`);
  
  try {
    switch (platform) {
      case 'youtube': {
        // Use YouTube oEmbed API for basic info (public API)
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube video data');
        }
        
        const data = await response.json();
        console.log('YouTube API response:', data);
        
        // Estimate a file size based on the video ID length (just for demonstration)
        const estimatedSizeMB = Math.round(10 + (videoId.length * 2));
        
        // Calculate a random duration for demonstration
        const durationSecs = 30 + (videoId.charCodeAt(0) % 10) * 60; // Between 30 seconds and 10 minutes
        
        return {
          title: data.title || 'YouTube Video',
          thumbnail: data.thumbnail_url?.replace('hqdefault', 'maxresdefault') || 'https://i.ytimg.com/vi/default/maxresdefault.jpg',
          duration: formatDuration(durationSecs),
          fileSize: `${estimatedSizeMB} MB`,
          author: data.author_name || 'YouTube Creator',
          availableQualities: ['1080p', '720p', '480p', '360p', 'audio']
        };
      }
      
      case 'instagram':
      case 'tiktok': {
        // For Instagram and TikTok, we need to generate realistic mock data
        // since we don't have direct API access in the frontend
        
        // Generate hash from video ID for consistent random-like values
        const hash = Array.from(videoId).reduce((acc, char) => {
          return acc + char.charCodeAt(0);
        }, 0);
        
        const mockTitles = {
          instagram: [
            'Beautiful day at the beach #sunset',
            'Amazing food at this restaurant! #foodie',
            'Morning workout routine #fitness',
            'New outfit for today #fashion',
            'Travel memories from last summer #travel'
          ],
          tiktok: [
            'Wait for it... 😂 #funny #trend',
            'Learn this dance in 15 seconds! #dance',
            'Life hack you didn\'t know about #lifehack',
            'POV: When your friend... #relatable',
            'This sound is going viral! #viral'
          ]
        };
        
        const titleIndex = hash % 5;
        const durationValue = platform === 'instagram' ? (hash % 60) + 10 : (hash % 20) + 5;
        const duration = `${Math.floor(durationValue / 60)}:${(durationValue % 60).toString().padStart(2, '0')}`;
        const fileSize = `${(hash % 40) + 10} MB`;
        
        // Generate a unique but deterministic thumbnail URL based on the video ID
        const thumbnailSeed = videoId.substring(0, 6);
        const thumbnailUrl = platform === 'instagram' 
          ? `https://source.unsplash.com/featured/1080x1080?sunset,portrait&sig=${thumbnailSeed}`
          : `https://source.unsplash.com/featured/540x960?dance,trend&sig=${thumbnailSeed}`;
        
        return {
          title: mockTitles[platform][titleIndex],
          thumbnail: thumbnailUrl,
          duration: duration,
          fileSize: fileSize,
          author: platform === 'instagram' ? '@' + videoId.substring(0, 8) : '@user_' + videoId.substring(0, 6),
          availableQualities: platform === 'instagram' 
            ? ['1080p', '720p', '480p'] 
            : ['720p', '480p', '360p']
        };
      }
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  } catch (error) {
    console.error(`Error fetching ${platform} video data:`, error);
    throw new Error(`Failed to retrieve video information from ${platform}`);
  }
};

export const downloadVideo = async (url: string, platform: Platform, quality: Quality): Promise<void> => {
  const videoId = extractVideoId(url, platform);
  
  if (!videoId) {
    throw new Error(`Invalid ${platform} URL format`);
  }
  
  console.log(`Downloading ${platform} video ${videoId} in ${quality} quality`);
  
  try {
    // In a real application with a backend (Django as mentioned), this would make an API call
    // to your backend that would handle the actual video download using youtube-dl, pytube, etc.
    
    // For this frontend demo, we'll create a download file by generating a simulated video
    // The file will just be a text file with the filename matching the video platform and ID
    
    // Create a binary file to simulate a small video file (enough to trigger a download)
    // In a real app, your backend would stream the actual video file
    
    // Generate some binary data to simulate a video file (1KB of data)
    const array = new Uint8Array(1024);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    
    // Create a Blob from the array
    let mimeType = 'video/mp4';
    if (quality === 'audio') {
      mimeType = 'audio/mp3';
    }
    
    const videoBlob = new Blob([array], { type: mimeType });
    
    // Create a URL for the Blob
    const videoUrl = URL.createObjectURL(videoBlob);
    
    // Create a download link
    const link = document.createElement('a');
    
    // Set the filename based on the platform, video ID, and selected quality
    const extension = quality === 'audio' ? 'mp3' : 'mp4';
    const fileName = `${platform}_${videoId}_${quality}.${extension}`;
    
    link.href = videoUrl;
    link.download = fileName;
    
    // Append to the body (required for Firefox)
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(videoUrl);
    
    console.log('Download completed successfully');
  } catch (error) {
    console.error(`Error downloading ${platform} video:`, error);
    throw new Error(`Failed to download video from ${platform}`);
  }
};
