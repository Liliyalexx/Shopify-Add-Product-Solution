
import React from 'react';
import { Package, Circle, Calendar, Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductListItem {
  id: string;
  name: string;
  image: string | null;
  sizes: string[];
  colors: string[];
  datePosted: string;
  quantity: number;
  available: boolean;
}

interface ProductListProps {
  products: ProductListItem[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Posted Products</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Colors</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {product.sizes.map((size, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-sm rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {product.colors.map((color, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-1"
                      >
                        <Circle className="w-4 h-4" fill={color} stroke={color} />
                        <span className="text-sm">{color}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {product.datePosted}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{product.quantity}</span>
                </TableCell>
                <TableCell>
                  {product.available ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <Check className="w-4 h-4" />
                      <span>In Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600">
                      <X className="w-4 h-4" />
                      <span>Out of Stock</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
