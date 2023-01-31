import { Dimensions } from "react-native";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUnits = () =>{
    const { width, height } = Dimensions.get('window');
    const units = {
        vw: width / 100,
        vh: height / 100,
      };
    return units
}