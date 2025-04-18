
import React from 'react';
import VariantsTable from '@/components/variant-generator/VariantsTable';

interface VariantPreviewProps {
  variants: string[][];
  headers: string[];
  description: string;
  productImage: string | null;
}

const VariantPreview: React.FC<VariantPreviewProps> = ({
  variants,
  headers,
  description,
  productImage
}) => {
  if (variants.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6 mb-4">
        List of Products: {variants.length}
      </h2>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      
      <VariantsTable 
        variants={variants}
        headers={headers}
        description={description}
        productImage={productImage}
      />
    </div>
  );
};

export default VariantPreview;
