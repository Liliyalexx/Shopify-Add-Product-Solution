
import React, { useState } from 'react';
import { Option, ShopifyColor } from '@/types/variant-generator';
import { generateVariants, variantTableHeaders } from '@/services/variant-generator.service';
import { useToast } from '@/hooks/use-toast';
import ProductHeader from '@/components/variant-generator/ProductHeader';
import ProductTabs from '@/components/variant-generator/ProductTabs';
import ProductDetails from '@/components/variant-generator/ProductDetails';
import OptionsInputs from '@/components/variant-generator/OptionsInputs';
import ColorSelector from '@/components/variant-generator/ColorSelector';
import VariantPreview from '@/components/variant-generator/VariantPreview';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string | null;
  options: Option[];
  selectedColors: string[];
  variants: string[][];
}

const defaultOptions = [
  { name: 'Size', values: [] },
  { name: 'Form', values: [] },
  { name: 'Color', values: [] }
];

const VariantGenerator: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([{
    id: '1',
    name: 'Stretch Slipcover',
    description: '',
    image: null,
    options: [...defaultOptions],
    selectedColors: [],
    variants: []
  }]);
  
  const [activeProductId, setActiveProductId] = useState<string>('1');
  
  const [shopifyColors, setShopifyColors] = useState<ShopifyColor[]>([
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Green', code: '#00FF00' },
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Gray', code: '#808080' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Purple', code: '#800080' },
    { name: 'Pink', code: '#FFC0CB' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Brown', code: '#A52A2A' },
    { name: 'Navy', code: '#000080' },
    { name: 'Beige', code: '#F5F5DC' },
  ]);

  const { toast } = useToast();
  
  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  const updateProductField = (field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => 
      p.id === activeProductId ? { ...p, [field]: value } : p
    ));
  };

  const updateOptionValues = (index: number, valuesString: string) => {
    const newOptions = [...activeProduct.options];
    newOptions[index].values = valuesString.split(',').map(v => v.trim());
    
    updateProductField('options', newOptions);
    updateVariants(newOptions, activeProduct.selectedColors);
  };

  const handleAddColor = (color: ShopifyColor) => {
    setShopifyColors(prevColors => [...prevColors, color]);
    handleColorSelection(color.name);
  };

  const handleColorSelection = (colorName: string) => {
    const newSelectedColors = activeProduct.selectedColors.includes(colorName)
      ? activeProduct.selectedColors.filter(c => c !== colorName)
      : [...activeProduct.selectedColors, colorName];
    
    updateProductField('selectedColors', newSelectedColors);
    
    const newOptions = [...activeProduct.options];
    newOptions[2].values = newSelectedColors;
    updateProductField('options', newOptions);
    
    updateVariants(newOptions, newSelectedColors);
  };

  const updateVariants = (currentOptions: Option[], colors: string[]) => {
    const generatedVariants = generateVariants(currentOptions, colors, shopifyColors);
    updateProductField('variants', generatedVariants);
  };

  const addNewProduct = () => {
    const newId = (parseInt(products[products.length - 1].id) + 1).toString();
    const newProduct: Product = {
      id: newId,
      name: `Product ${newId}`,
      description: '',
      image: null,
      options: [...defaultOptions],
      selectedColors: [],
      variants: []
    };
    
    setProducts([...products, newProduct]);
    setActiveProductId(newId);
    
    toast({
      title: "New Product Added",
      description: `Now editing: ${newProduct.name}`
    });
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);
    
    if (activeProductId === id) {
      setActiveProductId(newProducts[0].id);
    }
    
    toast({
      title: "Product Deleted",
      description: "The product has been removed"
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <ProductHeader onAddProduct={addNewProduct} />
      
      <ProductTabs 
        products={products}
        activeProductId={activeProductId}
        onSelectProduct={setActiveProductId}
        onDeleteProduct={deleteProduct}
      />
      
      <ProductDetails 
        name={activeProduct.name}
        description={activeProduct.description}
        image={activeProduct.image}
        onNameChange={(name) => updateProductField('name', name)}
        onDescriptionChange={(desc) => updateProductField('description', desc)}
        onImageChange={(img) => updateProductField('image', img)}
      />
    
      <OptionsInputs 
        options={activeProduct.options}
        updateOptionValues={updateOptionValues}
      />

      <ColorSelector 
        shopifyColors={shopifyColors}
        selectedColors={activeProduct.selectedColors}
        onAddColor={handleAddColor}
        onColorSelection={handleColorSelection}
      />

      <VariantPreview 
        variants={activeProduct.variants}
        headers={variantTableHeaders}
        description={activeProduct.description}
        productImage={activeProduct.image}
      />
    </div>
  );
};

export default VariantGenerator;
