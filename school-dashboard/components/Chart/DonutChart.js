import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { backgroundColors, borderColors } from './chartColors';

export default function DoughnutChart({ title, chartData }) {
  //   console.log(chartData);
  const labels = chartData?.map((item) => item.word) || [];
  const dataToChart = chartData?.map((item) => item.total) || [];
  //   console.log(dataToChart);

  ChartJS.register(ArcElement);
  ChartJS.register(Tooltip);
  ChartJS.register(Legend);

  const data = {
    labels,
    datasets: [
      {
        // label: '# of Votes',
        data: dataToChart,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
  return (
    <div>
      <div className="header">
        <h4 className="title">{title}</h4>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
}
