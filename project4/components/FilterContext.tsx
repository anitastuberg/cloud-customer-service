import { createContext, Dispatch } from "react";
import { Action, HelloState, initialState } from "../Context/reducer";


export const FilterContext = createContext<{
    state: HelloState;
    dispatch: Dispatch<Action>;
  }>({
    state: initialState,
    dispatch: () => undefined,
  });

export default FilterContext;