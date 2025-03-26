import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  sourceLang: { value: undefined, label: "Dili Algıla" },
  targetLang: { value: "en", label: "English" },
  textToTranslate: "",
  translatedText: "",
};
const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.sourceLang = action.payload;
    },
    setTarget: (state, action) => {
      state.targetLang = action.payload;
    },
    setText: (state, action) => {
      state.textToTranslate = action.payload;
    },
    swap: (state) => {
      const newTargetLang = state.targetLang;
      const newSourceLang = state.sourceLang;
      const newText = state.textToTranslate;
      const newTexted = state.translatedText;

      state.sourceLang = newTargetLang;
      state.targetLang = newSourceLang;
      state.textToTranslate = newTexted;
      state.translatedText = newText;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.translatedText = "";
    });
    builder.addCase(translateText.rejected, (state) => {
      state.isLoading = false;
      alert("Çevirme işlemi başarısız..!!");
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.translatedText = action.payload;
    });
  },
});
export const { setSource, setTarget, setText, swap } = translateSlice.actions;
export default translateSlice.reducer;
