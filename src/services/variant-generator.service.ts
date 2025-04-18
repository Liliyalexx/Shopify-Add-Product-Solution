
import { Option, ShopifyColor } from '@/types/variant-generator';

export const generateVariants = (
  options: Option[], 
  selectedColors: string[], 
  shopifyColors: ShopifyColor[]
): string[][] => {
  const sizes = options[0].values;
  const forms = options[1].values;
  
  const generatedVariants: string[][] = [];

  sizes.forEach(size => {
    forms.forEach(form => {
      selectedColors.forEach(color => {
        const colorObj = shopifyColors.find(c => c.name === color);
        const colorCode = colorObj ? colorObj.code : '';
        
        const sku = `SSC-${size.charAt(0)}-${form.charAt(0)}-${color.substring(0, 3).toUpperCase()}`;
        generatedVariants.push([
          'stretch-slipcover', 
          'Stretch Slipcover', 
          'Size', 
          size, 
          'Form', 
          form, 
          'Color', 
          color,
          sku,
          colorCode
        ]);
      });
    });
  });

  return generatedVariants;
};

export const variantTableHeaders = [
  'Handle', 
  'Title', 
  'Option1 Name', 
  'Option1 Value', 
  'Option2 Name', 
  'Option2 Value', 
  'Option3 Name', 
  'Option3 Value', 
  'Variant SKU',
  'Color Code'
];
