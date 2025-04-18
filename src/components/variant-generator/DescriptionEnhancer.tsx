
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
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

  return (
    <div className="h-full border-2 border-blue-500 rounded-md shadow-md p-4 flex flex-col">
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a basic product description"
        className="flex-grow min-h-[180px] mb-4"
      />
      <Button 
        onClick={enhanceDescription} 
        disabled={isEnhancing}
        className="w-full sm:w-auto flex items-center gap-2 mt-auto"
        variant="outline"
      >
        <Wand2 className="w-4 h-4" />
        {isEnhancing ? "Enhancing..." : "Enhance with AI"}
      </Button>
    </div>
  );
};

export default DescriptionEnhancer;
