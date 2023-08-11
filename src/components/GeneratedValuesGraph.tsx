import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GeneratedValuesGraph = () => {
  const generatedValuesData: { value: number; timestamp: number }[] =
    useSelector((state: any) => state.generatedValues.generatedValuesData);
  const lastTenData = generatedValuesData.slice(-10);
  const timestamps = lastTenData.map(({ timestamp }) =>
    new Date(timestamp).toLocaleString()
  );
  const values = lastTenData.map(({ value }) => {
    if (typeof value === "number") {
      return value.toFixed(2);
    } else {
      return "N/A";
    }
  });

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Generated Values",
        data: values,
        fill: false,
        borderColor: "#a52786",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "kWh",
        },
      },
    },
  };

  return (
    <div className="chart">
      <h3>Energy Produced</h3>
      <Line data={data} options={options} />
    </div>
  );
};
export default GeneratedValuesGraph;
