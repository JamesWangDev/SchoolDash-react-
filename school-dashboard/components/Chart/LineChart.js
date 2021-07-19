import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { backgroundColors, borderColors } from './chartColors';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          display: true,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: true,
        },
      },
    ],
  },
  animation: {
    easing: 'easeInBounce',
    duration: 1500,
  },
  responsive: true,

  maintainAspectRatio: false,
  legend: {
    display: true,
  },
};

export default function LineChart({ title, chartData }) {
  const labels = chartData.map((item) => item.item.slice(16));
  const dataToChart = chartData.map((item) => item.data);
  // console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: 'Cards Collected This Week',
        data: dataToChart,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* <div className="header">
        <h3 className="title">{title}</h3>
      </div> */}
      <Line data={data} options={options} />
    </>
  );
}
