import { createStore, combineReducers, Store } from "redux";

export type AppState = {
    ordering: string;
};
//Funksjoner som returnerer action-objekter
export function changeOrder(personName: string) {
    return {
        type: "change_order",
        payload: personName
    } as const;
}

type Actions = ReturnType<typeof changeOrder> ;

//Reducer-funksjonen, initialiserer store med tom liste
function orderingReducer(state: string = "first_name = asc", action: Actions) {
    switch (action.type) {
        case "change_order":
            return state = action.payload ;
    }
    return state;
}

//Utility-funksjon for å kombinere flere reducere
const rootReducer = combineReducers<AppState>({
    ordering: orderingReducer
});

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

//Oppretter en store
export const store = configureStore();
