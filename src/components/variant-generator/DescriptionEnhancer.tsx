
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Wand2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DescriptionEnhancerProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionEnhancer: React.FC<DescriptionEnhancerProps> = ({
  description,
  setDescription,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [savedDescriptions, setSavedDescriptions] = useState<string[]>([]);
  const { toast } = useToast();

  const enhanceDescription = () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a basic description to enhance",
        variant: "destructive"
      });
      return;
    }

    setIsEnhancing(true);
    
    // Simple simulation of AI enhancement for demo purposes
    setTimeout(() => {
      const enhancedDescription = `${description} This premium product is designed for ultimate comfort and style. Features durable, easy-care fabric that stretches to fit perfectly. Available in multiple sizes and colors to match any decor.`;
      setDescription(enhancedDescription);
      setIsEnhancing(false);
      
      toast({
        title: "Description Enhanced",
        description: "AI has improved your product description"
      });
    }, 1500);
  };

  const saveDescription = () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description to save",
        variant: "destructive"
      });
      return;
    }

    setSavedDescriptions([...savedDescriptions, description]);
    setDescription(''); // Clear the input for a new description
    
    toast({
      title: "Description Saved",
      description: `Added to list (${savedDescriptions.length + 1} products)`
    });
  };

  return (
    <div className="h-full border-gray-300 rounded-md shadow-md p-4 flex flex-col bg-white">
      <div className="flex-grow">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a basic product description"
          className="w-full min-h-[180px] mb-4 bg-white border-gray-300"
        />
        
        {savedDescriptions.length > 0 && (
          <div className="mb-4">
            <Label className="mb-2 block">Saved Descriptions ({savedDescriptions.length})</Label>
            <div className="max-h-[100px] overflow-y-auto border border-gray-300 rounded-md p-2 bg-gray-50">
              {savedDescriptions.map((desc, index) => (
                <div key={index} className="text-sm p-1 border-b border-gray-200 last:border-0">
                  {desc.length > 80 ? `${desc.substring(0, 80)}...` : desc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        <Button 
          onClick={enhanceDescription} 
          disabled={isEnhancing}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Wand2 className="w-4 h-4" />
          {isEnhancing ? "Enhancing..." : "Enhance with AI"}
        </Button>
        
        <Button 
          onClick={saveDescription}
          className="flex items-center gap-2"
          variant="default"
        >
          <Plus className="w-4 h-4" />
          Add to List
        </Button>
      </div>
    </div>
  );
};

export default DescriptionEnhancer;
