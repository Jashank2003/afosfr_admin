// components/LineChart.js
'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Adjust legend position
        
      },
      title: {
        display: true,
        text: 'Sales Analytics',
      },
    },
  };

  return <Line options={chartOptions} data={data} />;
};

export default LineChart;
