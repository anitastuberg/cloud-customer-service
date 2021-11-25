import { NativeBaseProvider } from 'native-base';
import React, { createContext, Dispatch, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initialState, reducer } from '../Context/reducer';
import { MyTabs } from './MyTabs';
import { FilterContext } from './FilterContext';


 export const Page = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
      <FilterContext.Provider value={{ state, dispatch }}>
        <SafeAreaProvider>
        <NativeBaseProvider>
              <MyTabs />
        </NativeBaseProvider>
        </SafeAreaProvider>
        </FilterContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height:"100%"
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: "100%"
    },
  });

export default Page;