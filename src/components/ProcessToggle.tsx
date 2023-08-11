import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProcess } from "../redux/reduxActions";

const ProcessToggle = () => {
  const dispatch = useDispatch();
  const processRunning = useSelector(
    (state: any) => state.generatedValues.processRunning
  );

  useEffect(() => {}, [processRunning, dispatch]);
  return (
    <button className="button" onClick={() => dispatch(toggleProcess())}>
      {processRunning ? "Toggle Off" : "Toggle On"}
    </button>
  );
};
export default ProcessToggle;
