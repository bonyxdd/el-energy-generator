import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGeneratedValue } from "../redux/reduxActions";
import ProcessToggle from "./ProcessToggle";

const GeneratorComp = ({ genName, speed }: {genName:number, speed:number}) => {
  const dispatch = useDispatch();
  const generator = useSelector((state: any) => state.generatedValues[genName]);
  console.log("🚀 ~ file: GeneratorComp.tsx:9 ~ GeneratorComp ~ generator:", generator)
  const processRunning = generator?.processRunning;
  const generatedValuesData = generator?.generatedValuesData || [];
  const minValue = generator?.minValue;
  console.log("🚀 ~ file: GeneratorComp.tsx:13 ~ GeneratorComp ~ minValue:", minValue)
  const maxValue = generator?.maxValue;
  console.log("🚀 ~ file: GeneratorComp.tsx:15 ~ GeneratorComp ~ maxValue:", maxValue)
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
        dispatch(
          addGeneratedValue({
            genName,
            value: Number(randomValue),
            timestamp: currentTimeStamp,
          })
        );
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [processRunning, dispatch]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("generatedValues") || "{}");
    const newData = {
      ...existingData,
      [genName]: {
        generatedValuesData: generatedValuesData,
        processRunning: processRunning,
        minValue: minValue,
        maxValue: maxValue,
      },
    };
    localStorage.setItem("generatedValues", JSON.stringify(newData));
  }, [generatedValuesData, genName, processRunning, minValue, maxValue]);

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
      <ProcessToggle genName={genName}/>
    </div>
  );
};
export default GeneratorComp;