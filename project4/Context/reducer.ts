export interface HelloState {
    Basic: string;
    Standard: string;
    Premium: string;
    Name: string;
}

export type Action =
    | { type: 'Basic'; payload: string }
    | { type: 'Standard'; payload: string }
    | { type: 'Premium'; payload: string }
    | { type: 'Name'; payload: string };

export const initialState: HelloState = {
    Basic: 'Basic',
    Standard: 'Standard',
    Premium: 'Premium',
    Name: '',
};

export function reducer(state = initialState, action: Action): HelloState {
    switch (action.type) {
        case 'Basic':
            return { ...state, Basic: action.payload };
        case 'Standard':
            return { ...state, Standard: action.payload };
        case 'Premium':
            return { ...state, Premium: action.payload };
        case 'Name':
            return { ...state, Name: action.payload };
        default:
            return state;
    }
}
