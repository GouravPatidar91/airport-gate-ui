
import React from 'react';
import { Filter, Plane, Navigation, Ticket } from 'lucide-react';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';

const airlines = [
  { id: "delta", name: "Delta" },
  { id: "united", name: "United" },
  { id: "american", name: "American" },
  { id: "southwest", name: "Southwest" },
  { id: "jetblue", name: "JetBlue" },
];

const amenities = [
  { id: "restaurant", name: "Restaurants" },
  { id: "shop", name: "Shops" },
  { id: "lounge", name: "Lounges" },
  { id: "restroom", name: "Restrooms" },
  { id: "charging", name: "Charging Stations" },
];

const terminals = [
  { id: "a", name: "Terminal A" },
  { id: "b", name: "Terminal B" },
  { id: "c", name: "Terminal C" },
  { id: "d", name: "Terminal D" },
];

const FilterSidebar = () => {
  return (
    <aside className="w-64 border-r border-border h-[calc(100vh-57px)] overflow-y-auto bg-background flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="mr-2 h-5 w-5" /> Filters
          </h2>
          <Button variant="ghost" size="sm">Reset</Button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Plane className="mr-2 h-4 w-4" /> Airlines
            </h3>
            {airlines.map((airline) => (
              <div key={airline.id} className="flex items-center space-x-2 mb-2">
                <Checkbox id={`airline-${airline.id}`} />
                <Label
                  htmlFor={`airline-${airline.id}`}
                  className="text-sm font-normal"
                >
                  {airline.name}
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Navigation className="mr-2 h-4 w-4" /> Terminal
            </h3>
            <RadioGroup defaultValue="a">
              {terminals.map((terminal) => (
                <div key={terminal.id} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={terminal.id} id={`terminal-${terminal.id}`} />
                  <Label
                    htmlFor={`terminal-${terminal.id}`}
                    className="text-sm font-normal"
                  >
                    {terminal.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Ticket className="mr-2 h-4 w-4" /> Amenities
            </h3>
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2 mb-2">
                <Checkbox id={`amenity-${amenity.id}`} />
                <Label
                  htmlFor={`amenity-${amenity.id}`}
                  className="text-sm font-normal"
                >
                  {amenity.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-border">
        <Button className="w-full">Apply Filters</Button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
