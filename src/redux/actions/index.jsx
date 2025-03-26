import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // api isteği at
    const res = await api.get("/languages");

    // payload ı return et
    return res.data.languages;
  }
);
// Thunk aksiyonları 2 parametre alır
// 1-) Bizim gönderdiğimiz
// 2-) Redux un gönderdikleri
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (_, { getState }) => {
    // Aksiyon içerisind isen store daki verilere erişmeyi sağlayan fonk
    const { translate } = getState();

    // Api isteği at

    const res = await api.post("", {
      q: translate.textToTranslate,
      source: translate.sourceLang.value,
      target: translate.targetLang.value,
    });

    // Payloadı return et

    return res.data.data.translations.translatedText[0];
  }
);
