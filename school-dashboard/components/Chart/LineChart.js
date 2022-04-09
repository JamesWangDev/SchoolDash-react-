import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import { backgroundColors, borderColors } from './chartColors';

const options = {
  scales: {
    yAxes: [
      {
        id: 'A',
        type: 'linear',
        position: 'right',
        ticks: {
          max: 35000,
          min: 0,
        },
      },
      {
        id: 'B',
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  animation: {
    easing: 'easeInBounce',
    duration: 1500,
  },
  responsive: true,
  stacked: false,
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
};

export default function LineChart({ title, chartData, label }) {
  const labels = chartData?.map((item) => item.item.slice(16)) ?? [];
  const dataToChart = chartData?.map((item) => item.data) ?? [];
  // take array of numbers and create array oc cumulative values
  const cumulativeSum = ((sum) => (value) => (sum += value))(0);
  const cumulativeData = dataToChart.map(cumulativeSum);
  const marbleData = dataToChart.map((item) => Math.round(item / 5));

  // console.log(cumulativeData);
  const data = {
    labels,
    datasets: [
      {
        label: 'Cumulative Cards',
        data: cumulativeData,
        backgroundColor: backgroundColors[8],
        borderColor: borderColors[8],
        borderWidth: 1,
        yAxisID: 'A',
      },
      {
        label,
        data: marbleData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        yAxisID: 'B',
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
