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
  (min:number, { value }: {value:number}) => (value < min ? value : min),
  Number.MAX_VALUE
);

const maxValue = initialGeneratedValues.reduce(
  (max:number, { value }: {value:number}) => (value > max ? value : max),
  Number.MIN_VALUE
);
const store = configureStore({
  reducer: {
    store: storeReducer,
    generatedValues: generateReducer,
  },
  preloadedState: {
    generatedValues: {
      generatedValuesData: initialGeneratedValues,
      processRunning: false,
      minValue: minValue === Number.MAX_VALUE ? 0 : minValue,
      maxValue: maxValue === Number.MIN_VALUE ? 0 : maxValue,
      currentPage: 1,
    },
  },
});

export default store;
