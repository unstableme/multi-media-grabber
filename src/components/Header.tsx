
import React from 'react';
import { Download } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 animate-fade-in">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2 text-primary-foreground">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-medium leading-none">VideoGrab</h1>
            <p className="text-xs text-muted-foreground">Multi-Platform Video Downloader</p>
          </div>
        </div>
        
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground animate-underline">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground animate-underline">
                How it works
              </a>
            </li>
            <li>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground animate-underline">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
