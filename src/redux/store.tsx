import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import generateReducer from "./generateReducer";

interface GenerateValue {
  value: number;
  timestamp: number;
}

interface GeneratorState {
  generatedValuesData: GenerateValue[];
  processRunning: boolean;
  minValue: number;
  maxValue: number;
}
interface GeneratedValues {
  [genName: number]: GeneratorState;
}

const storedGeneratedValues = localStorage.getItem("generatedValues");
const initialGeneratedValues: GeneratedValues = storedGeneratedValues
? JSON.parse(storedGeneratedValues)
: {};

//Getting data from local storage

const generatedValuesInitialState: GeneratedValues = {};
Object.keys(initialGeneratedValues).forEach((genName) => {
  generatedValuesInitialState[Number(genName)] = {
    generatedValuesData: initialGeneratedValues[Number(genName)]?.generatedValuesData || [],
    processRunning: false,
    minValue: initialGeneratedValues[Number(genName)]?.minValue,
    maxValue: initialGeneratedValues[Number(genName)]?.maxValue,
  };
});

const store = configureStore({
  reducer: {
    store: storeReducer,
    generatedValues: generateReducer,
  },
  preloadedState: {
    generatedValues: generatedValuesInitialState,
  },
});

export default store;