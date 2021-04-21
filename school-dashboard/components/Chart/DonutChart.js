import { Doughnut } from '@reactchartjs/react-chart.js';

export default function DoughnutChart({ title, chartData }) {
  //   console.log(chartData);
  const labels = chartData.map((item) => item.word);
  const dataToChart = chartData.map((item) => item.total);
  //   console.log(dataToChart);

  const data = {
    labels,
    datasets: [
      {
        // label: '# of Votes',
        data: dataToChart,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
        ],
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
    <>
      <div className="header">
        <h4 className="title">{title}</h4>
      </div>
      <Doughnut data={data} options={options} />
    </>
  );
}
