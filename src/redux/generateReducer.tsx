import { createReducer, PayloadAction, } from '@reduxjs/toolkit';
import { addGeneratedValue, sortGeneratedValues, toggleProcess, setCurrentPage } from './reduxActions';

interface GenerateValue {
  value: number;
  timestamp: number;
}

interface GenerateState {
  generatedValuesData: GenerateValue[];
  processRunning: boolean;
  minValue: number,
  maxValue: number
  currentPage: number;
}
const initialState: GenerateState = {
  generatedValuesData: [],
  processRunning: true,
  minValue: Number.MAX_VALUE,
  maxValue: Number.MIN_VALUE,
  currentPage: NaN,
};

const generateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addGeneratedValue, (state, action: PayloadAction<GenerateValue>) => {
      const { value, timestamp } = action.payload;
      state.generatedValuesData.push({ value, timestamp });
      state.minValue = Math.min(state.minValue, value);
      state.maxValue = Math.max(state.maxValue, value);
    })
    .addCase(toggleProcess, (state) => {
      state.processRunning = !state.processRunning;
    })
    .addCase(setCurrentPage, (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    })
    .addCase(sortGeneratedValues, (state, action: PayloadAction<string>) => {
      const sortBy = action.payload;
      if (sortBy === 'byValue') {
        state.generatedValuesData.sort((a, b) => a.value - b.value);
      } else if (sortBy === 'byTime') {
        state.generatedValuesData.sort((a, b) => a.timestamp - b.timestamp);
      }
    });
});

export default generateReducer;