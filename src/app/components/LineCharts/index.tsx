import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const LineCharts: React.FC<ApexChartProps> = ({ series, categories }) => {
  const options: ApexOptions = {
    chart: {
      height: 270,
      type: 'line', 
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], 
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={270} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineCharts;
