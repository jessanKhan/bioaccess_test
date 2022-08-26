import { combineReducers } from 'redux';

import chathomeReducer from './chathome/chathome.reducer';

export default combineReducers({

  userlist: chathomeReducer,
});
