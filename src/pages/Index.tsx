
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F2FF] p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-6">Shopify Products</h1>
        <p className="text-xl text-gray-600 mb-8">
          Easily generate product variants for Shopify bulk imports
        </p>
        <Link to="/variant-generator">
          <Button size="lg">
            Start Generating Variants
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
