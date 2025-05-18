
import React from 'react';
import { cn } from '@/lib/utils';
import { Plane } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface GateProps {
  id: string;
  status: 'available' | 'occupied';
  airline: string;
  flightNumber: string;
  isSelected: boolean;
  onClick: () => void;
}

const Gate: React.FC<GateProps> = ({
  id,
  status,
  airline,
  flightNumber,
  isSelected,
  onClick,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            'gate relative flex items-center justify-center w-10 h-10 rounded-md border cursor-pointer transition-all',
            status === 'available' 
              ? 'border-primary/30 bg-primary/5 text-primary hover:bg-primary/10' 
              : 'border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/10',
            isSelected && 'ring-2 ring-primary ring-offset-1'
          )}
          onClick={onClick}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium">{id}</span>
            {status === 'occupied' && (
              <Plane className="h-3 w-3 mt-0.5" />
            )}
          </div>
          {isSelected && (
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-current"></span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        <div className="text-xs">
          <p className="font-medium">{id} - {status === 'available' ? 'Available' : 'Occupied'}</p>
          {status === 'occupied' && (
            <>
              <p>{airline}</p>
              <p>Flight: {flightNumber}</p>
            </>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Gate;
