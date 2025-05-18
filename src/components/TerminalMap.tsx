
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Gate from './Gate';

// Sample gate data
const gateData = {
  'A': Array.from({ length: 24 }, (_, i) => ({
    id: `A${i + 1}`,
    status: Math.random() > 0.7 ? 'occupied' : 'available',
    airline: ['Delta', 'American', 'United', 'Southwest'][Math.floor(Math.random() * 4)],
    flightNumber: `${['DL', 'AA', 'UA', 'WN'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 1000) + 1000}`,
  })),
  'B': Array.from({ length: 18 }, (_, i) => ({
    id: `B${i + 1}`,
    status: Math.random() > 0.7 ? 'occupied' : 'available',
    airline: ['JetBlue', 'Alaska', 'Spirit', 'Frontier'][Math.floor(Math.random() * 4)],
    flightNumber: `${['B6', 'AS', 'NK', 'F9'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 1000) + 1000}`,
  })),
  'C': Array.from({ length: 30 }, (_, i) => ({
    id: `C${i + 1}`,
    status: Math.random() > 0.7 ? 'occupied' : 'available',
    airline: ['Delta', 'American', 'United', 'Southwest', 'JetBlue'][Math.floor(Math.random() * 5)],
    flightNumber: `${['DL', 'AA', 'UA', 'WN', 'B6'][Math.floor(Math.random() * 5)]}${Math.floor(Math.random() * 1000) + 1000}`,
  })),
};

// Icons for amenities
const amenities = [
  { id: 'restaurant1', type: 'restaurant', position: 'top-10 left-20', name: 'Starbucks' },
  { id: 'restaurant2', type: 'restaurant', position: 'top-40 right-24', name: 'Burger King' },
  { id: 'shop1', type: 'shop', position: 'top-1/2 left-1/4', name: 'Duty Free' },
  { id: 'lounge1', type: 'lounge', position: 'bottom-12 right-12', name: 'Delta Sky Club' },
  { id: 'restroom1', type: 'restroom', position: 'top-20 left-1/3', name: 'Restroom' },
  { id: 'restroom2', type: 'restroom', position: 'bottom-32 right-1/3', name: 'Restroom' },
];

const TerminalMap = () => {
  const [currentTerminal, setCurrentTerminal] = useState('A');
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleGateClick = (gateId: string) => {
    setSelectedGate(gateId === selectedGate ? null : gateId);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <Tabs defaultValue="map" className="w-full">
        <div className="flex items-center justify-between border-b border-border px-4">
          <TabsList className="h-12">
            <TabsTrigger value="map" className="data-[state=active]:bg-primary/10">Map View</TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-primary/10">List View</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
              >
                -
              </Button>
              <span className="px-3 text-sm">{Math.round(zoomLevel * 100)}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
              >
                +
              </Button>
            </div>
            
            <div className="flex items-center border rounded-md">
              <Button
                variant={currentTerminal === 'A' ? "secondary" : "ghost"}
                size="sm"
                className="h-8 rounded-r-none"
                onClick={() => setCurrentTerminal('A')}
              >
                A
              </Button>
              <Button
                variant={currentTerminal === 'B' ? "secondary" : "ghost"}
                size="sm"
                className="h-8 rounded-none border-x"
                onClick={() => setCurrentTerminal('B')}
              >
                B
              </Button>
              <Button
                variant={currentTerminal === 'C' ? "secondary" : "ghost"}
                size="sm"
                className="h-8 rounded-l-none"
                onClick={() => setCurrentTerminal('C')}
              >
                C
              </Button>
            </div>
          </div>
        </div>
        
        <TabsContent value="map" className="h-[calc(100vh-115px)] relative overflow-hidden mt-0">
          <div 
            className="absolute w-full h-full map-pan"
            style={{ 
              transform: `scale(${zoomLevel})`, 
              transformOrigin: 'center', 
              transition: 'transform 0.2s ease-out' 
            }}
          >
            {/* Terminal Visualization */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-muted/30 rounded-lg border border-muted">
              {/* Terminal Label */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                Terminal {currentTerminal}
              </div>
              
              {/* Main Walkway */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-16 bg-muted/70 flex items-center justify-center">
                <div className="w-[90%] h-1 bg-secondary/50 rounded-full relative">
                  <div className="absolute -top-1 left-0 h-3 w-3 rounded-full bg-secondary animate-pulse-light" />
                  <div className="absolute -top-1 left-1/3 h-3 w-3 rounded-full bg-secondary animate-pulse-light" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute -top-1 left-2/3 h-3 w-3 rounded-full bg-secondary animate-pulse-light" style={{ animationDelay: '1s' }} />
                  <div className="absolute -top-1 right-0 h-3 w-3 rounded-full bg-secondary animate-pulse-light" style={{ animationDelay: '1.5s' }} />
                </div>
              </div>
              
              {/* Gates - Top Row */}
              <div className="absolute top-8 left-8 right-8 flex justify-around">
                {gateData[currentTerminal].slice(0, 12).map((gate) => (
                  <Gate 
                    key={gate.id}
                    id={gate.id}
                    status={gate.status}
                    airline={gate.airline}
                    flightNumber={gate.flightNumber}
                    isSelected={gate.id === selectedGate}
                    onClick={() => handleGateClick(gate.id)}
                  />
                ))}
              </div>
              
              {/* Gates - Bottom Row */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-around">
                {gateData[currentTerminal].slice(12, 24).map((gate) => (
                  <Gate 
                    key={gate.id}
                    id={gate.id}
                    status={gate.status}
                    airline={gate.airline}
                    flightNumber={gate.flightNumber}
                    isSelected={gate.id === selectedGate}
                    onClick={() => handleGateClick(gate.id)}
                  />
                ))}
              </div>
              
              {/* Amenity Icons */}
              {amenities.map((amenity) => (
                <div 
                  key={amenity.id} 
                  className={`absolute ${amenity.position} bg-background p-1 rounded-full cursor-pointer shadow-sm border border-border`}
                  title={amenity.name}
                >
                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80"
            onClick={() => setCurrentTerminal(currentTerminal === 'A' ? 'C' : currentTerminal === 'B' ? 'A' : 'B')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80"
            onClick={() => setCurrentTerminal(currentTerminal === 'A' ? 'B' : currentTerminal === 'B' ? 'C' : 'A')}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          {/* Selected Gate Info */}
          {selectedGate && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card p-4 rounded-lg shadow-lg border border-border w-80">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Gate {selectedGate}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedGate(null)}>Close</Button>
              </div>
              
              {(() => {
                const gate = gateData[currentTerminal].find(g => g.id === selectedGate);
                if (!gate) return null;
                
                return (
                  <>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={gate.status === 'occupied' ? 'text-destructive' : 'text-primary'}>
                          {gate.status === 'occupied' ? 'Occupied' : 'Available'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Airline:</span>
                        <span>{gate.airline}</span>
                      </div>
                      
                      {gate.status === 'occupied' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Flight:</span>
                            <span>{gate.flightNumber}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Departure:</span>
                            <span>
                              {new Date(Date.now() + Math.random() * 12 * 60 * 60 * 1000).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Walking time:</span>
                        <span>~{Math.floor(Math.random() * 10) + 2} min</span>
                      </div>
                    </div>
                    
                    {gate.status === 'occupied' && (
                      <Button className="w-full mt-3">View Flight Details</Button>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="mt-0 h-[calc(100vh-115px)] overflow-y-auto p-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Terminal {currentTerminal} Gates</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Total gates: {gateData[currentTerminal].length}, 
              Available: {gateData[currentTerminal].filter(g => g.status === 'available').length}, 
              Occupied: {gateData[currentTerminal].filter(g => g.status === 'occupied').length}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gateData[currentTerminal].map((gate) => (
                <div 
                  key={gate.id} 
                  className={`p-3 rounded-lg border ${gate.id === selectedGate ? 'border-primary bg-primary/5' : 'border-border'} cursor-pointer hover:bg-muted/50 transition-colors`}
                  onClick={() => handleGateClick(gate.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Gate {gate.id}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${gate.status === 'occupied' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      {gate.status === 'occupied' ? 'Occupied' : 'Available'}
                    </span>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Airline:</span>
                      <span>{gate.airline}</span>
                    </div>
                    
                    {gate.status === 'occupied' && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Flight:</span>
                        <span>{gate.flightNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TerminalMap;
