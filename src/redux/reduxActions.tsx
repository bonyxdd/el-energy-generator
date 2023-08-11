import { createAction } from '@reduxjs/toolkit';

export const setAuthorized = createAction<boolean>('store/setAuthorized');
export const setUserName = createAction<string>('store/setUserName');
export const addGeneratedValue = createAction<{ value: number;  timestamp: number}>('generatedValues/addGeneratedValue');
export const sortGeneratedValues = createAction<string>('generatedValues/sortGeneratedValues');
export const setCurrentPage = createAction<number>('generatedValues/setCurrentPage');
export const toggleProcess = createAction('process/toggle');