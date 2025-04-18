
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ShopifyColor } from '@/types/variant-generator';

interface ColorSelectorProps {
  shopifyColors: ShopifyColor[];
  selectedColors: string[];
  onAddColor: (color: ShopifyColor) => void;
  onColorSelection: (colorName: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  shopifyColors, 
  selectedColors, 
  onAddColor, 
  onColorSelection 
}) => {
  const [newColorName, setNewColorName] = useState('');
  const [newColorCode, setNewColorCode] = useState('#000000');

  const handleAddColor = () => {
    if (!newColorName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a color name",
        variant: "destructive",
      });
      return;
    }

    if (shopifyColors.some(color => color.name.toLowerCase() === newColorName.trim().toLowerCase())) {
      toast({
        title: "Error",
        description: "This color name already exists",
        variant: "destructive",
      });
      return;
    }

    const color = { 
      name: newColorName.trim(), 
      code: newColorCode || '#000000' 
    };
    
    onAddColor(color);
    
    setNewColorName('');
    setNewColorCode('#000000');
    
    toast({
      title: "Success",
      description: `Added color: ${color.name}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Shopify Colors</h2>
        <div className="flex gap-2">
          <Input 
            placeholder="Color name" 
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
            className="max-w-[150px]"
          />
          <Input 
            type="color" 
            value={newColorCode}
            onChange={(e) => setNewColorCode(e.target.value)}
            className="w-16 p-1"
          />
          <Button onClick={handleAddColor} type="button">Add</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {shopifyColors.map((color) => (
          <div 
            key={color.name} 
            className={`border rounded p-2 cursor-pointer ${
              selectedColors.includes(color.name) ? 'border-primary bg-primary/10' : 'border-gray-200'
            }`}
            onClick={() => onColorSelection(color.name)}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: color.code }}
              />
              <span>{color.name}</span>
            </div>
            <div className="text-xs text-gray-500">{color.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
