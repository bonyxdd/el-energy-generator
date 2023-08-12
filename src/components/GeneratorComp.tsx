import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGeneratedValue } from "../redux/reduxActions";
import ProcessToggle from "./ProcessToggle";

const GeneratorComp = ({ genName }: {genName:number}) => {
  const dispatch = useDispatch();
  const generator = useSelector((state: any) => state.generatedValues[genName] || {});
  const processRunning = useSelector((state: any) => state.generatedValues[genName]?.processRunning);
  const generatedValuesData: { value: number; timestamp: number }[] =
    useSelector((state: any) => state.generatedValues[genName]?.generatedValuesData || []);
  const minValue: number = useSelector(
    (state: any) => state.generatedValues[genName].minValue
  );
  const maxValue: number = useSelector(
    (state: any) => state.generatedValues[genName].maxValue
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
        dispatch(
          addGeneratedValue({
            genName,
            value: Number(randomValue),
            timestamp: currentTimeStamp,
          })
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [processRunning, dispatch]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("generatedValues") || "{}");
    const newData = {
      ...existingData,
      [genName]: {
        genName,
        generatedValues: generatedValuesData,
      },
    };
    localStorage.setItem("generatedValues", JSON.stringify(newData));
  }, [generatedValuesData, genName]);

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