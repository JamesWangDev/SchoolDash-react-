import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { backgroundColors, borderColors } from './chartColors';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          display: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: false,
        },
      },
    ],
  },
  animation: {
    easing: 'easeInBounce',
    duration: 2500,
  },
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
};

export default function LineChart({ title, chartData }) {
  const labels = chartData.map((item) => item.item);
  const dataToChart = chartData.map((item) => item.data);
  console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: dataToChart,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="header">
        <h3 className="title">{title}</h3>
      </div>
      <Line data={data} options={options} />
    </>
  );
}
