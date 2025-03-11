
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

export const fetchVideoData = async (url: string, platform: Platform): Promise<VideoData> => {
  const videoId = extractVideoId(url, platform);
  
  if (!videoId) {
    throw new Error(`Invalid ${platform} URL format`);
  }
  
  // In a production app, these API requests would go to your backend server
  // where the actual video processing happens. For this demo, we'll simulate 
  // with public APIs where possible and fall back to enhanced mock data.
  
  try {
    switch (platform) {
      case 'youtube': {
        // Use YouTube oEmbed API for basic info (public API)
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube video data');
        }
        
        const data = await response.json();
        
        // YouTube video details (in a real app, this would come from your backend using youtube-dl or similar)
        return {
          title: data.title,
          thumbnail: data.thumbnail_url.replace('hqdefault', 'maxresdefault'), // Try to get better thumbnail
          duration: '3:42', // We can't get this from oEmbed - would come from backend in real app
          fileSize: '42 MB', // Estimated - would come from backend in real app
          author: data.author_name,
          availableQualities: ['1080p', '720p', '480p', '360p', 'audio']
        };
      }
      
      case 'instagram':
      case 'tiktok':
        // These platforms don't have simple public APIs we can use in the client
        // In a real app, these would be server requests to your backend
        // For this demo, we'll create more realistic mock data based on the videoId

        // Generate a deterministic but random-looking title based on videoId
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
            'Life hack you didn't know about #lifehack',
            'POV: When your friend... #relatable',
            'This sound is going viral! #viral'
          ]
        };
        
        const titleIndex = hash % 5;
        const duration = platform === 'instagram' ? `${(hash % 60) + 10}s` : `${(hash % 20) + 5}s`;
        const fileSize = `${(hash % 40) + 10} MB`;
        
        // Use unsplash for random but deterministic images based on the ID
        const imageId = videoId.substring(0, 6);
        const thumbnailUrl = `https://source.unsplash.com/featured/1200x800?${platform}&sig=${imageId}`;
        
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
  
  // In a real application, this would make an API call to your backend
  // For a client-side demo, we'll create a download by generating a temporary anchor element
  console.log(`Downloading ${platform} video ${videoId} in ${quality} quality`);
  
  try {
    // This simulates fetching a blob from your backend
    // In a real app, your backend would process the video with youtube-dl or similar
    // and return the actual video file
    
    // We'll demonstrate with a placeholder download for now
    // Typically the backend would stream the file to the user
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    
    // Set the file name based on platform and quality
    const fileName = `${platform}_video_${videoId}_${quality}.mp4`;
    
    // Normally, the href would be a blob URL or direct link to your backend
    // For demo, we'll just create a data URI with minimal content
    const dummyContent = `This is a placeholder for the actual ${platform} video download in ${quality} quality.`;
    const dataBlob = new Blob([dummyContent], { type: 'text/plain' });
    
    link.href = URL.createObjectURL(dataBlob);
    link.download = fileName;
    
    // Append to the body
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    console.log('Download initiated successfully');
  } catch (error) {
    console.error(`Error downloading ${platform} video:`, error);
    throw new Error(`Failed to download video from ${platform}`);
  }
};
