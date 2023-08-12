import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProcess } from "../redux/reduxActions";

interface ProcessToggleProps {
  genName: number;
}

const ProcessToggle: React.FC<ProcessToggleProps> = ({ genName }) => {
  const dispatch = useDispatch();
  const processRunning = useSelector(
    (state: any) => state.generatedValues[genName]?.processRunning
  );
  console.log("🚀 ~ file: ProcessToggle.tsx:14 ~ processRunning:", processRunning)

  useEffect(() => {}, [processRunning, dispatch]);
  return (
    <button className="button" onClick={() => {
      dispatch(toggleProcess({ genName }));
      console.log("🚀 ~ file: ProcessToggle.tsx:19 ~ toggleProcess:", toggleProcess({genName}))
    }}>
      {processRunning ? "Toggle Off" : "Toggle On"}
    </button>
  );
};
export default ProcessToggle;
