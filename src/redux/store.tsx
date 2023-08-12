import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import generateReducer from "./generateReducer";

interface GenerateValue {
  value: number;
  timestamp: number;
}

const storedGeneratedValues = localStorage.getItem("generatedValues");
const initialGeneratedValues = storedGeneratedValues
? JSON.parse(storedGeneratedValues)
: [] as GenerateValue[];
const minValue = initialGeneratedValues.reduce(
  (min:number, { value }: {value:number}) => Math.min(min, value),
  Number.MAX_VALUE
);

const maxValue = initialGeneratedValues.reduce(
  (max:number, { value }: {value:number}) => Math.max(max, value),
  Number.MIN_VALUE
);
const store = configureStore({
  reducer: {
    store: storeReducer,
    generatedValues: generateReducer,
  },
  preloadedState: {
    generatedValues: {
      1: {
      generatedValuesData: initialGeneratedValues,
      processRunning: false,
      minValue: minValue === Number.MAX_VALUE ? 0 : minValue,
      maxValue: maxValue === Number.MIN_VALUE ? 0 : maxValue,
      },
      2: {
        generatedValuesData: initialGeneratedValues,
        processRunning: false,
        minValue: minValue === Number.MAX_VALUE ? 0 : minValue,
        maxValue: maxValue === Number.MIN_VALUE ? 0 : maxValue,
        },
    },
  },
});

export default store;