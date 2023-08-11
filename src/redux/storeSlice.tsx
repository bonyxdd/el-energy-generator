import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  username: "",
};
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});
export const { setAuthorized, setUserName } = storeSlice.actions;
export default storeSlice.reducer;
