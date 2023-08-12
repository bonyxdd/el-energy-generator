import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import GeneratedValuesGraph from "./GeneratedValuesGraph";
import GeneratorComp from "./GeneratorComp";
import { addGenerator } from "../redux/reduxActions";

const EnergyGenerator = () => {
  const dispatch = useDispatch();
  const [genNames, setGenNames] = React.useState<number[]>([]);
  const genSpeed = 1000;

  useEffect(() => {
    const storedGeneratedValues = localStorage.getItem("generatedValues");
    if (!storedGeneratedValues) {
      const initialData = {};
      localStorage.setItem("generatedValues", JSON.stringify(initialData));
    }

    const generatorKeys = Object.keys(JSON.parse(storedGeneratedValues || "{}"));
    setGenNames(generatorKeys.map(Number));
  }, []);

  const createNewGenerator = () => {
    const newGenName = genNames.length > 0 ? Math.max(...genNames) + 1 : 1;
    setGenNames((prevGenNames) => [...prevGenNames, newGenName]);
    dispatch(addGenerator({ genName: newGenName }));

    const storedGeneratedValues = localStorage.getItem("generatedValues");
    const updatedData = {
      ...JSON.parse(storedGeneratedValues),
      [newGenName]: {
      },
    };
    localStorage.setItem("generatedValues", JSON.stringify(updatedData));
  };
  return (
    <section className="energy-wrapper">
      <div className="user__buttons">
        <button className="button--user" onClick={createNewGenerator}>Create New Generator</button>

      </div>
      <div className="energy-wrapper__card">
      {genNames.map((genName) => (
          <div className="generator--wrapper" key={genName}>
          <GeneratorComp genName={genName} speed={genSpeed} />
            <GeneratedValuesGraph genName={genName} />
          </div>
        ))}
      </div>
    </section>
  );
};
export default EnergyGenerator;
