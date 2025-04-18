
import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface VariantsTableProps {
  variants: string[][];
  headers: string[];
  description?: string;
  productImage?: string | null;
}

const VariantsTable: React.FC<VariantsTableProps> = ({ 
  variants, 
  headers, 
  description,
  productImage 
}) => {
  if (variants.length === 0) {
    return null;
  }

  // Prepare data for CSV export with description and image info
  let csvData = [];
  
  if (description) {
    csvData.push(['Product Description', description]);
  }
  
  if (productImage) {
    csvData.push(['Product Image', 'Included (Base64)']);
  }
  
  if (description || productImage) {
    csvData.push([]);  // Add empty row as separator
  }
  
  csvData = [...csvData, ...variants];

  return (
    <div className="flex flex-col gap-4">
      {productImage && (
        <div className="mb-2">
          <img 
            src={productImage} 
            alt="Product" 
            className="w-24 h-24 object-contain border rounded"
          />
        </div>
      )}
      
      <CSVLink 
        data={csvData}
        headers={headers}
        filename={'shopify-products.csv'}
      >
        <Button variant="default">
          Export to CSV
        </Button>
      </CSVLink>

      <div className="mt-4 max-h-64 overflow-auto border rounded">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant, idx) => (
              <TableRow key={idx}>
                {variant.map((cell, cellIdx) => (
                  <TableCell key={cellIdx}>
                    {cellIdx === 9 && cell ? (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: cell }}
                        />
                        {cell}
                      </div>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VariantsTable;
