
import React from 'react';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
}

interface ProductTabsProps {
  products: Product[];
  activeProductId: string;
  onSelectProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ 
  products, 
  activeProductId, 
  onSelectProduct, 
  onDeleteProduct 
}) => {
  const { toast } = useToast();

  const handleDeleteProduct = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    if (products.length <= 1) {
      toast({
        title: "Cannot Delete",
        description: "You must have at least one product",
        variant: "destructive"
      });
      return;
    }
    
    onDeleteProduct(id);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {products.map(product => (
        <div 
          key={product.id}
          className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
            product.id === activeProductId ? 'bg-primary text-primary-foreground' : 'bg-secondary'
          }`}
          onClick={() => onSelectProduct(product.id)}
        >
          <span>{product.name}</span>
          {products.length > 1 && (
            <Trash2 
              className="w-4 h-4 hover:text-destructive" 
              onClick={(e) => handleDeleteProduct(e, product.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductTabs;
