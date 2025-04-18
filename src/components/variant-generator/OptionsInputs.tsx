
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Option } from '@/types/variant-generator';

interface OptionsInputsProps {
  options: Option[];
  updateOptionValues: (index: number, values: string) => void;
}

const OptionsInputs: React.FC<OptionsInputsProps> = ({ options, updateOptionValues }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Size Options</Label>
        <Input 
          placeholder="Enter Size values (comma-separated)"
          value={options[0].values.join(', ')}
          onChange={(e) => updateOptionValues(0, e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Form Options</Label>
        <Input 
          placeholder="Enter Form values (comma-separated)"
          value={options[1].values.join(', ')}
          onChange={(e) => updateOptionValues(1, e.target.value)}
        />
      </div>
    </div>
  );
};

export default OptionsInputs;
