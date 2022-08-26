import chathomeTypes from './chathome.types';


export const setReciver = (reciver) => {
    return {
        type: chathomeTypes.SET_RECIVER,
        payload: reciver
    }
}