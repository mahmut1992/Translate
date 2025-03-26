import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setSource, setTarget, swap } from "../redux/slices/translateSlice";

const LanguageSelect = () => {
  const { isLoading, error, languages } = useSelector(
    (store) => store.language
  );
  const { sourceLang, targetLang } = useSelector((store) => store.translate);
  const dispatch = useDispatch();
  // React select kütüphanesinin istediği
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  // Bizim apiden gelen veriler
  // const options1 = [
  //   { language: "chocolate", name: "Chocolate" },
  //   { language: "strawberry", name: "Strawberry" },
  //   { language: "vanilla", name: "Vanilla" },
  // ];
  //! Apiden gelen verileri kütüphanenin istediği şekle dönüştürmemiz lazım language değerlerini value name değerlerini labele çevir

  const formatted =
    languages?.map((item) => ({
      value: item.language,
      label: item.name,
    })) || [];
  // dili algıla eklediğimiz versiyon

  const detected = { value: undefined, label: "Dili Algıla" };

  return (
    <div className="flex gap-2 text-black">
      <Select
        onChange={(lang) => {
          if (lang.value === targetLang.value) {
            dispatch(swap());
          }
          dispatch(setSource(lang));
        }}
        options={[detected, ...formatted]}
        className="flex-1"
        isLoading={isLoading}
        isDisabled={isLoading}
        value={sourceLang}
      />
      <button
        disabled={sourceLang.value === undefined}
        onClick={() => dispatch(swap())}
        className="bg-zinc-700 py-2 px-6 hover:bg-zinc-800 transition rounded text-white cursor-pointer disabled:opacity-60"
      >
        Değiş
      </button>
      <Select
        value={targetLang}
        onChange={(lang) => {
          if (lang.value === sourceLang.value) {
            dispatch(swap());
          }
          dispatch(setTarget(lang));
        }}
        options={formatted}
        className="flex-1"
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </div>
  );
};

export default LanguageSelect;
