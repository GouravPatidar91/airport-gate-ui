
import React from 'react';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import TerminalMap from '@/components/TerminalMap';
import InfoSidebar from '@/components/InfoSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = React.useState(!isMobile);
  const [showInfo, setShowInfo] = React.useState(!isMobile);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Filter Sidebar with toggle for mobile */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <FilterSidebar />
        </div>
        {isMobile && !showFilters && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full z-10"
            onClick={() => setShowFilters(true)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        {isMobile && showFilters && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-64 top-1/2 transform -translate-y-1/2 translate-x-2 rounded-full z-10 bg-background"
            onClick={() => setShowFilters(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Map Area */}
        <TerminalMap />

        {/* Info Sidebar with toggle for mobile */}
        <div className={`${showInfo ? 'block' : 'hidden'} md:block`}>
          <InfoSidebar />
        </div>
        {isMobile && !showInfo && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full z-10"
            onClick={() => setShowInfo(true)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        {isMobile && showInfo && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-80 top-1/2 transform -translate-y-1/2 -translate-x-2 rounded-full z-10 bg-background"
            onClick={() => setShowInfo(false)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
