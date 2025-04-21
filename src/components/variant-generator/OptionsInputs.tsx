
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Option } from '@/types/variant-generator';
import { useToast } from '@/hooks/use-toast';

interface OptionsInputsProps {
  options: Option[];
  updateOptionValues: (index: number, values: string) => void;
}

const OptionsInputs: React.FC<OptionsInputsProps> = ({ options, updateOptionValues }) => {
  const [savedSizes, setSavedSizes] = useState<string[]>([]);
  const [savedForms, setSavedForms] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddSize = () => {
    if (!options[0].values.length) {
      toast({
        title: "Size Required",
        description: "Please enter at least one size value",
        variant: "destructive"
      });
      return;
    }
    setSavedSizes([...savedSizes, options[0].values.join(', ')]);
    updateOptionValues(0, '');
    toast({
      title: "Sizes Saved",
      description: `Added to list (${savedSizes.length + 1} size options)`
    });
  };

  const handleAddForm = () => {
    if (!options[1].values.length) {
      toast({
        title: "Form Required",
        description: "Please enter at least one form value",
        variant: "destructive"
      });
      return;
    }
    setSavedForms([...savedForms, options[1].values.join(', ')]);
    updateOptionValues(1, '');
    toast({
      title: "Forms Saved",
      description: `Added to list (${savedForms.length + 1} form options)`
    });
  };

  return (
    <div className="my-6 p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Options</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <Label className="font-medium">Size Options</Label>
            <div className="mt-2 space-y-2">
              <Input 
                placeholder="Enter Size values (comma-separated)"
                value={options[0].values.join(', ')}
                onChange={(e) => updateOptionValues(0, e.target.value)}
                className="bg-white border-gray-300"
              />
              <p className="text-xs text-gray-500">Example: Small, Medium, Large, XL</p>
              <Button 
                onClick={handleAddSize}
                className="w-full mt-2 bg-blue-800"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Size to List
              </Button>
            </div>
            {savedSizes.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm text-gray-600">Saved Sizes ({savedSizes.length})</Label>
                <div className="mt-2 max-h-[100px] overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50">
                  {savedSizes.map((size, index) => (
                    <div key={index} className="text-sm p-1 border-b border-gray-100 last:border-0">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <Label className="font-medium">Form Options</Label>
            <div className="mt-2 space-y-2">
              <Input 
                placeholder="Enter Form values (comma-separated)"
                value={options[1].values.join(', ')}
                onChange={(e) => updateOptionValues(1, e.target.value)}
                className="bg-white border-gray-300"
              />
              <p className="text-xs text-gray-500">Example: Liquid, Powder, Capsule</p>
              <Button 
                onClick={handleAddForm}
                className="w-full mt-2 bg-blue-800"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Form to List
              </Button>
            </div>
            {savedForms.length > 0 && (
              <div className="mt-4">
                <Label className="text-sm text-gray-600">Saved Forms ({savedForms.length})</Label>
                <div className="mt-2 max-h-[100px] overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50">
                  {savedForms.map((form, index) => (
                    <div key={index} className="text-sm p-1 border-b border-gray-100 last:border-0">
                      {form}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsInputs;
