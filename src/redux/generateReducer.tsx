import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  addGeneratedValue,
  sortGeneratedValues,
  toggleProcess,
} from "./reduxActions";

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

const calculateMinValue = (values: GenerateValue[]): number => {
  return values.length > 0 ? Math.min(...values.map((value) => value.value)) : 0;
};

const calculateMaxValue = (values: GenerateValue[]): number => {
  return values.length > 0 ? Math.max(...values.map((value) => value.value)) : 0;
};

const storedGeneratedValues = localStorage.getItem("generatedValues");
const initialState: GeneratedValues = storedGeneratedValues
? JSON.parse(storedGeneratedValues)
: {};
console.log("🚀 ~ file: generateReducer.tsx:33 ~ initialState:", initialState)

const generateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addGeneratedValue,
      (state, action: PayloadAction<{
        genName: number; value: number; timestamp: number
      }>) => {
        const { genName, value, timestamp } = action.payload;
        if (!state[genName]) {
          state[genName] = {
            generatedValuesData: [],
            processRunning: true,
            minValue: Number.MAX_VALUE,
            maxValue: Number.MIN_VALUE,
          };
        }
        const generator = state[genName];
        generator.generatedValuesData.push({ value, timestamp });
        generator.minValue = calculateMinValue(generator.generatedValuesData);
        generator.maxValue = calculateMaxValue(generator.generatedValuesData);
      })
      .addCase(toggleProcess, (state, action: PayloadAction<{ genName: number }>) => {
        const { genName } = action.payload;
        const generator = state[genName];
        if (generator) {
          generator.processRunning = !generator.processRunning;
        }
      })
      .addCase(
        sortGeneratedValues,
        (state, action: PayloadAction<{ genName: number; sortBy: string }>) => {
          const { genName, sortBy } = action.payload;
          const generator = state[genName];
          if (generator) {
            if (sortBy === 'byValue') {
              generator.generatedValuesData.sort((a, b) => a.value - b.value);
            } else if (sortBy === 'byTime') {
              generator.generatedValuesData.sort((a, b) => a.timestamp - b.timestamp);
            }
          }
        }
      );
  });

export default generateReducer;