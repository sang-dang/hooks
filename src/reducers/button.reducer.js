import { CHANGE_BUTTON_COLOR } from '../action/root.action';
const buttonReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_BUTTON_COLOR:
      return {
        ...state,
        color1: action.newType
      };  

    default:
      return state;
  }
};
export default buttonReducer;