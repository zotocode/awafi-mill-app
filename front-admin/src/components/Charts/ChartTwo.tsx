import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dashboardapi from '../../api/dashboardapi';

// Define interface for product data
interface ProductData {
  productName: string;
  totalQuantity: number;
}

// Chart options function
const options = (categories: string[]): ApexOptions => {
  return {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '15%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
    },
    fill: {
      opacity: 1,
    },
  };
};

// Define chart state interface
interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

// Updated ChartTwo component with prop for top selling products
interface ChartTwoProps {
  topSellingProducts?: ProductData[];
}

const ChartTwo: React.FC<ChartTwoProps> = ({ topSellingProducts = [] }) => {
  // State for chart series and categories
  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Quantity',
        data: [],
      },
    ],
  });
  
  const [categories, setCategories] = useState<string[]>([]);

  // Effect to update chart when top selling products change
  useEffect(() => {
    // If products are passed via prop, use them
    if (topSellingProducts && topSellingProducts.length > 0) {
      // Extract product names and quantities
      const productNames = topSellingProducts.map(product => product.productName);
      const quantities = topSellingProducts.map(product => product.totalQuantity);

      // Update categories and chart state
      setCategories(productNames);
      setState({
        series: [
          {
            name: 'Quantity',
            data: quantities,
          },
        ],
      });
    } else {
      // Fallback to API call if no products are provided
      const fetchTopSellings = async () => {
        try {
          const response = await dashboardapi.topSellings();
     
          if (response && response.products) {
            // Prepare data for the chart
            const quantities = response.products.map((product: ProductData) => product.totalQuantity);
            const productNames = response.products.map((product: ProductData) => product.productName);
            
            setCategories(productNames);
            setState({
              series: [
                {
                  name: 'Quantity',
                  data: quantities,
                },
              ],
            });
          }
        } catch (error) {
          console.error('Error fetching top sellings:', error);
        }
      };

      fetchTopSellings();
    }
  }, [topSellingProducts]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Selling Products
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options(categories)}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;