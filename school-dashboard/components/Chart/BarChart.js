import React from 'react';
import { Bar } from '@reactchartjs/react-chart.js';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },

        display: false,
      },
    ],
  },
  animation: {
    easing: 'easeOutBounce',
    duration: 1500,
  },
  responsive: true,
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
};

export default function BarChart({ title, chartData }) {
  const labels = chartData.map((item) => item.item);
  const dataToChart = chartData.map((item) => item.totals);
  const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: dataToChart,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="header">
        <h3 className="title">{title}</h3>
      </div>
      <Bar data={data} options={options} />
    </>
  );
}
