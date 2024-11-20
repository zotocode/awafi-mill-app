import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import adminDashBoard from '../../api/dashboardapi';

interface RevenueData {
  period: string | { year?: string };
  totalRevenue: number;
  count: number;
}

interface Props {
  revenue: (revenue: number) => void; // Function that takes a number and updates revenue
}

const ChartOne: React.FC<Props> = ({ revenue }) => {
  const [state, setState] = useState<{
    series: {
      name: string;
      data: number[];
    }[];
  }>({
    series: [
      {
        name: 'Total Revenue',
        data: [0], // Initial placeholder data
      },
      {
        name: 'Order Count',
        data: [0], // Initial placeholder data for order count
      },
    ],
  });

  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('day');

  const fetchData = async (period: 'day' | 'month' | 'year') => {
    try {
      const response = await adminDashBoard.fetchTotalRevenue(period);
      const chartData: RevenueData[] = response.data;

      // Update the revenue in the parent component
      revenue(response.totalRevenue);

      let processedData: { x: string; y: number; count: number }[] = [];

      switch (period) {
        case 'day':
        case 'month':
          processedData = chartData.map((item) => ({
            x: item.period as string,
            y: item.totalRevenue,
            count: item.count,
          }));
          break;

        case 'year':
          processedData = chartData.map((item) => ({
            x: typeof item.period === 'object' ? item.period.year || '' : item.period,
            y: item.totalRevenue,
            count: item.count,
          }));
          break;
      }

      setState({
        series: [
          { name: 'Total Revenue', data: processedData.map((item) => item.y) },
          { name: 'Order Count', data: processedData.map((item) => item.count) },
        ],
      });

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: processedData.map((item) => item.x),
        },
      }));
    } catch (error) {
      console.error('Error fetching total revenue data:', error);
    }
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  const [options, setOptions] = useState<ApexOptions>({
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
    },
    xaxis: {
      type: 'category',
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
    },
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-extrabold text-primary">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-45 justify-end">
          {/* Period selection buttons */}
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black dark:text-white ${period === 'day' ? 'bg-primary text-white' : ''}`}
              onClick={() => setPeriod('day')}
            >
              Day
            </button>

            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black dark:text-white ${period === 'month' ? 'bg-primary text-white' : ''}`}
              onClick={() => setPeriod('month')}
            >
              Month
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black dark:text-white ${period === 'year' ? 'bg-primary text-white' : ''}`}
              onClick={() => setPeriod('year')}
            >
              Year
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart options={options} series={state.series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
