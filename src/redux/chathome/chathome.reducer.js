import chathomeTypes from './chathome.types';

initialState = {
    reciever: "",
    loading: false,
}

const chathomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case chathomeTypes.SET_RECIVER:
            return {
                ...state,
                reciever: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}

export default chathomeReducer;