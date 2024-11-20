import React, { ReactNode } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  CheckCircle, 
  BarChart, 
  DollarSign 
} from 'lucide-react';

interface CardDataStatsProps {
  title: string;
  total: string | number;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children?: ReactNode;
  icon?: 'shipped' | 'processing' | 'delivered' | 'views' | 'products' | 'revenue';
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  icon = 'views'
}) => {
  // Map icons to their respective types
  const iconMap = {
    shipped: <Truck className="w-6 h-6 stroke-gray-800" />,
    processing: <ShoppingCart className="w-6 h-6 stroke-gray-800" />,
    delivered: <CheckCircle className="w-6 h-6 stroke-gray-800" />,
    views: <BarChart className="w-6 h-6 stroke-gray-800" />,
    products: <Package className="w-6 h-6 stroke-gray-800" />,
    revenue: <DollarSign className="w-6 h-6 stroke-gray-800" />
  };

  // Select the appropriate icon
  const selectedIcon = iconMap[icon];

  return (
    <div className="rounded-sm border border-gray-300 bg-white text-gray-800 py-6 px-7.5 shadow-lg">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-gray-200">
        {children || selectedIcon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-gray-800">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? 'text-green-500' : ''
          } ${levelDown ? 'text-red-500' : ''}`}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-green-500"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-red-500"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
