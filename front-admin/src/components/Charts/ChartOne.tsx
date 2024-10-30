import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import adminDashBoard from '../../api/adminDashBoard';

interface RevenueData {
  totalRevenue: number;
  count: number;
  day: number;
}

const ChartOne: React.FC = () => {
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
      categories: [], // Will be dynamically set based on the selected period
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

  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

  // Function to fetch total revenue and order count data based on the selected period
  const fetchData = async (period: 'day' | 'week' | 'month') => {
    try {
      const response: RevenueData[] = await adminDashBoard.fetchTotalRevenue(period);
      const totalRevenueData = response.map((item) => ({
        x: item.day,  // Assuming `day` refers to x-axis categories
        y: item.totalRevenue,  // Total revenue for that day
        count: item.count, // Count of orders for that day
      }));

      setState({
        series: [
          { name: 'Total Revenue', data: totalRevenueData.map((item) => item.y) },
          { name: 'Order Count', data: totalRevenueData.map((item) => item.count) },
        ],
      });

      // Dynamically set x-axis categories based on the period
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: totalRevenueData.map((item) => `Day ${item.x}`),
        },
      }));
    } catch (error) {
      console.error('Error fetching total revenue data:', error);
    }
  };

  // Fetch data when the period changes
  useEffect(() => {
    fetchData(period);

    // Adjust x-axis categories based on the selected period
    if (period === 'day') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`) },
      }));
    } else if (period === 'week') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      }));
    } else if (period === 'month') {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      }));
    }
  }, [period]);

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
              className={`rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card dark:bg-boxdark dark:text-white ${period === 'day' ? 'bg-primary text-white' : ''}`}
              onClick={() => setPeriod('day')}
            >
              Day
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black dark:text-white ${period === 'week' ? 'bg-primary text-white' : ''}`}
              onClick={() => setPeriod('week')}
            >
              Week
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black dark:text-white ${period === 'month' ? 'bg-primary text-white' : ''}`}
              onClick={() => setPeriod('month')}
            >
              Month
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
