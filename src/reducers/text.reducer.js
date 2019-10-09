import { CHANGE_TEXT } from '../action/root.action';
const textReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        text1: action.newText
      };

    default:
      return state;
  }
};
export default textReducer;