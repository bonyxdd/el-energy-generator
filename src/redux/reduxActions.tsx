import { createAction } from '@reduxjs/toolkit';

export const setAuthorized = createAction<boolean>('store/setAuthorized');
export const setUserName = createAction<string>('store/setUserName');
export const addGeneratedValue = createAction<{ genName: number; value: number;  timestamp: number}>('generatedValues/addGeneratedValue');
export const sortGeneratedValues = createAction<{ genName: number; sortBy: string }>('generatedValues/sortGeneratedValues');
export const toggleProcess = createAction <{ genName: number }>('process/toggle');