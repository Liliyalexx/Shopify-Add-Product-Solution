
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import DescriptionEnhancer from '@/components/variant-generator/DescriptionEnhancer';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailsProps {
  name: string;
  description: string;
  image: string | null;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onImageChange: (image: string | null) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  description,
  image,
  onNameChange,
  onDescriptionChange,
  onImageChange
}) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
        toast({
          title: "Image Uploaded",
          description: `Image added to ${name}`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Product Image</Label>
          <div className="border-2 border-blue-500 rounded-md shadow-md h-[300px] p-4">
            {image ? (
              <div className="space-y-2 w-full h-full flex flex-col">
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-48 object-contain rounded-md flex-grow"
                />
                <Button 
                  variant="outline" 
                  className="w-full mt-auto" 
                  onClick={() => onImageChange(null)}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="text-center flex flex-col justify-center h-full">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <div className="text-sm text-muted-foreground mb-2">
                  Upload a product image
                </div>
                <label htmlFor="product-image">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Select Image</span>
                  </Button>
                </label>
                <input
                  type="file"
                  id="product-image"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Product Description</Label>
          <div className="h-[300px]">
            <DescriptionEnhancer 
              description={description}
              setDescription={onDescriptionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
