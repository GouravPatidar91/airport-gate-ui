
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  return (
    <header className="px-4 py-3 bg-background border-b border-border flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-secondary" />
        <h1 className="font-bold text-xl">AeroNav</h1>
      </div>
      <div className="relative max-w-md w-full mx-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search gates, shops, restaurants..."
          className="pl-9 bg-muted/50"
        />
      </div>
      <button className="flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground">
        <span className="sr-only">User menu</span>
        <span className="font-medium text-sm">JD</span>
      </button>
    </header>
  );
};

export default Header;
