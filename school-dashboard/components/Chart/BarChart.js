import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale , LinearScale, BarController, BarElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';
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

export default function BarChart({ title, chartData }) {
  const labels = chartData.map((item) => item.item);
  const dataToChart = chartData.map((item) => item.totals);
  console.log(labels);
ChartJS.register(ArcElement);
ChartJS.register(Tooltip);
ChartJS.register(Legend);
ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(BarController);
ChartJS.register(BarElement);


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
      <Bar data={data} options={options} />
    </>
  );
}
