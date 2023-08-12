import GeneratedValuesGraph from "./GeneratedValuesGraph";
import GeneratorComp from "./GeneratorComp";

const EnergyGenerator = () => {
  return (
    <section className="energy-wrapper">
      <div className="energy-wrapper__card">
        <div className="generator--wrapper">
        <GeneratorComp genName={1} />
        <GeneratedValuesGraph genName={1} />
        </div>
        <div className="generator--wrapper">
          <GeneratorComp genName={2} />
          <GeneratedValuesGraph genName={2} />
        </div>
      </div>
    </section>
  );
};
export default EnergyGenerator;
