import GeneratedValuesGraph from "./GeneratedValuesGraph";
import GeneratorComp from "./GeneratorComp";

const EnergyGenerator = () => {
  return (
    <section className="energy-wrapper">
      <div className="energy-wrapper__card">
        <GeneratorComp genName={"Generator N:1"} />
        <GeneratedValuesGraph />
      </div>
    </section>
  );
};
export default EnergyGenerator;
