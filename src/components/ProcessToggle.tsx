import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProcess } from "../redux/reduxActions";

interface ProcessToggleProps {
  genName: number;
}

const ProcessToggle: React.FC<ProcessToggleProps> = ({ genName }) => {
  const dispatch = useDispatch();
  const processRunning = useSelector(
    (state: any) => state.generatedValues[genName].processRunning
  );

  useEffect(() => {}, [processRunning, dispatch]);
  return (
    <button className="button" onClick={() => dispatch(toggleProcess({genName}))}>
      {processRunning ? "Toggle Off" : "Toggle On"}
    </button>
  );
};
export default ProcessToggle;
