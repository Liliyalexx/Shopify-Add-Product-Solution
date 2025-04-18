
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProductHeaderProps {
  onAddProduct: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ onAddProduct }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold">Products</h1>
      </div>
      <Button onClick={onAddProduct} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Product
      </Button>
    </div>
  );
};

export default ProductHeader;
