
import React, { useState } from 'react';
import { Clock, ArrowRight, Plane, Info, PlaneLanding, PlaneTakeoff, MapPin, Ticket } from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';

// Enhanced flight data with AI-generated details
const flights = [
  {
    id: 'DL1234',
    airline: 'Delta Airlines',
    destination: 'New York (JFK)',
    origin: 'San Francisco (SFO)',
    departureTime: '10:30',
    arrivalTime: '19:15',
    status: 'On Time',
    gate: 'A12',
    terminal: 'A',
    aircraft: 'Boeing 737-800',
    duration: '5h 45m',
    distance: '2,586 mi',
    baggage: 'Carousel 3',
    boarding: '10:00',
    seats: '132/162 filled',
    weather: { destination: 'Partly Cloudy, 72°F', origin: 'Sunny, 68°F' }
  },
  {
    id: 'UA5678',
    airline: 'United Airlines',
    destination: 'Chicago (ORD)',
    origin: 'San Francisco (SFO)',
    departureTime: '11:15',
    arrivalTime: '17:30',
    status: 'Delayed',
    gate: 'C22',
    terminal: 'C',
    aircraft: 'Airbus A320',
    duration: '4h 15m',
    distance: '1,846 mi',
    baggage: 'Carousel 5',
    boarding: '10:45',
    seats: '126/150 filled',
    weather: { destination: 'Rainy, 55°F', origin: 'Sunny, 68°F' }
  },
  {
    id: 'AA9012',
    airline: 'American Airlines',
    destination: 'Dallas (DFW)',
    origin: 'San Francisco (SFO)',
    departureTime: '12:45',
    arrivalTime: '18:20',
    status: 'On Time',
    gate: 'B5',
    terminal: 'B',
    aircraft: 'Boeing 787-9',
    duration: '3h 35m',
    distance: '1,464 mi',
    baggage: 'Carousel 2',
    boarding: '12:15',
    seats: '245/290 filled',
    weather: { destination: 'Hot, 86°F', origin: 'Sunny, 68°F' }
  },
  {
    id: 'WN3456',
    airline: 'Southwest Airlines',
    destination: 'Denver (DEN)',
    origin: 'San Francisco (SFO)',
    departureTime: '13:20',
    arrivalTime: '16:45',
    status: 'Boarding',
    gate: 'A3',
    terminal: 'A',
    aircraft: 'Boeing 737-700',
    duration: '2h 25m',
    distance: '954 mi',
    baggage: 'Carousel 1',
    boarding: '12:50',
    seats: '118/143 filled',
    weather: { destination: 'Cloudy, 61°F', origin: 'Sunny, 68°F' }
  },
  {
    id: 'B67890',
    airline: 'JetBlue Airways',
    destination: 'Boston (BOS)',
    origin: 'San Francisco (SFO)',
    departureTime: '14:30',
    arrivalTime: '23:05',
    status: 'On Time',
    gate: 'C15',
    terminal: 'C',
    aircraft: 'Airbus A321',
    duration: '5h 35m',
    distance: '2,704 mi',
    baggage: 'Carousel 6',
    boarding: '14:00',
    seats: '172/200 filled',
    weather: { destination: 'Clear, 63°F', origin: 'Sunny, 68°F' }
  },
];

// Sample nearby amenities
const nearbyAmenities = [
  {
    name: 'Starbucks',
    type: 'Coffee Shop',
    location: 'Terminal A, near Gate A10',
    walkingTime: '3 min',
  },
  {
    name: 'Duty Free Shop',
    type: 'Retail',
    location: 'Terminal A, Central Area',
    walkingTime: '5 min',
  },
  {
    name: 'Airport Lounge',
    type: 'Lounge',
    location: 'Terminal A, upper level',
    walkingTime: '7 min',
  },
];

const InfoSidebar = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [activeTab, setActiveTab] = useState('flights');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlights = flights.filter(flight => 
    flight.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <aside className="w-80 border-l border-border h-[calc(100vh-57px)] overflow-hidden bg-background flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="font-semibold text-lg">Airport Information</h2>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'flights' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab('flights')}
          >
            Flights
          </Button>
          <Button 
            variant={activeTab === 'amenities' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setActiveTab('amenities')}
          >
            Amenities
          </Button>
        </div>
      </div>

      {activeTab === 'flights' && (
        <>
          {selectedFlight ? (
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg flex items-center">
                    <Plane className="mr-2 h-5 w-5" /> {selectedFlight.id}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedFlight(null)}>
                    Back to List
                  </Button>
                </div>
                
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">{selectedFlight.departureTime}</span>
                      <span className="text-sm text-muted-foreground">{selectedFlight.origin.split('(')[0].trim()}</span>
                    </div>
                    <div className="flex-1 mx-3 flex flex-col items-center">
                      <div className="w-full h-[1px] bg-border relative">
                        <Plane className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-4 w-4 text-primary rotate-90" />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{selectedFlight.duration}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-2xl font-bold">{selectedFlight.arrivalTime}</span>
                      <span className="text-sm text-muted-foreground">{selectedFlight.destination.split('(')[0].trim()}</span>
                    </div>
                  </div>
                  
                  <div className={`text-xs px-2 py-1 rounded-full inline-block mb-1 ${
                    selectedFlight.status === 'Delayed' 
                      ? 'bg-destructive/10 text-destructive' 
                      : selectedFlight.status === 'Boarding'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-primary/10 text-primary'
                  }`}>
                    {selectedFlight.status}
                  </div>
                </div>
                
                <Card className="p-3">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Gate:</span>
                    </div>
                    <div className="font-medium">{selectedFlight.gate}</div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Terminal:</span>
                    </div>
                    <div>{selectedFlight.terminal}</div>
                    
                    <div className="flex items-center">
                      <Ticket className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Boarding:</span>
                    </div>
                    <div>{selectedFlight.boarding}</div>
                    
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Aircraft:</span>
                    </div>
                    <div>{selectedFlight.aircraft}</div>
                    
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Distance:</span>
                    </div>
                    <div>{selectedFlight.distance}</div>
                    
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Baggage:</span>
                    </div>
                    <div>{selectedFlight.baggage}</div>
                    
                    <div className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Seats:</span>
                    </div>
                    <div>{selectedFlight.seats}</div>
                  </div>
                </Card>
                
                <Card className="p-3">
                  <h4 className="font-medium mb-2 text-sm">Weather Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-muted-foreground mb-1">Origin</div>
                      <div>{selectedFlight.weather.origin}</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-muted-foreground mb-1">Destination</div>
                      <div>{selectedFlight.weather.destination}</div>
                    </div>
                  </div>
                </Card>
                
                <div className="text-xs text-muted-foreground">
                  <Info className="h-3 w-3 inline mr-1" />
                  Flight information powered by AI predictions and may not reflect real-time data.
                </div>
              </div>
            </ScrollArea>
          ) : (
            <>
              <div className="p-4 border-b border-border">
                <Command className="rounded-lg border">
                  <CommandInput 
                    placeholder="Search flights..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                </Command>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4" /> Upcoming Departures
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs h-7">View All</Button>
                  </div>
                  
                  {filteredFlights.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground text-sm">
                      No flights match your search
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredFlights.map((flight) => (
                        <div 
                          key={flight.id} 
                          className="rounded-md border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleFlightSelect(flight)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium flex items-center">
                              {flight.status === 'Boarding' || flight.status === 'On Time' ? (
                                <PlaneTakeoff className="mr-1 h-4 w-4 text-primary" />
                              ) : (
                                <PlaneLanding className="mr-1 h-4 w-4 text-secondary" />
                              )}
                              {flight.id}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              flight.status === 'Delayed' 
                                ? 'bg-destructive/10 text-destructive' 
                                : flight.status === 'Boarding'
                                  ? 'bg-secondary/20 text-secondary'
                                  : 'bg-muted text-muted-foreground'
                            }`}>
                              {flight.status}
                            </span>
                          </div>
                          
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Destination:</span>
                              <span>{flight.destination}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Departure:</span>
                              <span>{flight.departureTime}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Gate:</span>
                              <span className="font-medium">{flight.gate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </>
      )}
      
      {activeTab === 'amenities' && (
        <ScrollArea className="flex-1 p-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Nearby Amenities</h3>
              <Button variant="ghost" size="sm" className="text-xs h-7">Show on Map</Button>
            </div>
            
            <div className="space-y-3">
              {nearbyAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                  <div className="w-8 h-8 rounded-md bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="text-xs">{amenity.type.charAt(0)}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{amenity.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{amenity.location}</p>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    {amenity.walkingTime}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      )}
    </aside>
  );
};

export default InfoSidebar;
