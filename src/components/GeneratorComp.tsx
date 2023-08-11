import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGeneratedValue,
} from "../redux/reduxActions";
import ProcessToggle from "./ProcessToggle";

const GeneratorComp = ({ genName }: any) => {
  const dispatch = useDispatch();
  const processRunning = useSelector(
    (state: any) => state.generatedValues.processRunning
  );
  const generatedValuesData: { value: number; timestamp: number }[] = useSelector(
    (state: any) => state.generatedValues.generatedValuesData
  );
  const minValue: number = useSelector(
    (state: any) => state.generatedValues.minValue
  );
  const maxValue: number = useSelector(
    (state: any) => state.generatedValues.maxValue
  );
  const lastValue =
    generatedValuesData.length > 0
      ? generatedValuesData[generatedValuesData.length - 1].value
      : null;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (processRunning) {
      intervalId = setInterval(() => {
        const randomValue = (Math.random() * 89.99).toFixed(2);
        const currentTimeStamp = Number(new Date());
        dispatch(addGeneratedValue({ value: Number(randomValue), timestamp: currentTimeStamp }));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [processRunning, dispatch]);

  useEffect(() => {
    localStorage.setItem("generatedValues", JSON.stringify(generatedValuesData));
  }, [generatedValuesData]);

  return (
    <div className="generator-card">
      <div>
        <h2>{genName}</h2>
        <p className={processRunning ? "p--green" : "p--red"}>
          {processRunning ? "Running" : "Not running"}
        </p>
      </div>
      <div className="generator-card__content">
        <p>
          {typeof lastValue === "number"
            ? "Current: " + lastValue.toFixed(2) + " kWh"
            : "No value generated yet"}
        </p>
        <p>Min Value: {minValue.toFixed(2)} kWh</p>
        <p>Max Value: {maxValue.toFixed(2)} kWh</p>
      </div>
      <ProcessToggle />
    </div>
  );
};
export default GeneratorComp;
