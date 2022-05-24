import { Chart as ChartJS, ArcElement, Tooltip, Legend, PointElement, LineElement , CategoryScale, LinearScale, Filler} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { backgroundColors, borderColors } from './chartColors';

ChartJS.register(ArcElement);
ChartJS.register(Tooltip);
ChartJS.register(Legend);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(Filler);

const options = {
  scales: {
   y:{
        
        type: 'linear',
        position: 'right',
         max: 45000,
         min: 0,
      },
     y1: {
       
        type: 'linear',
        position: 'left',
       min: 0,
      },
    
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
        yAxisID: 'y',
        tension: .3,
        fill: true,
      },
      {
        label,
        data: marbleData,
        backgroundColor: backgroundColors[0],
        borderColor: borderColors[0],
        borderWidth: 1,
        yAxisID: 'y1',
        tension: .3,
        fill: true,
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
