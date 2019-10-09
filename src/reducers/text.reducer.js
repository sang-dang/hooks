const textReducer = (state, action) => {
  switch (action.type) {
    case 'changeText':
      return {
        ...state,
        text1: action.newText
      };

    default:
      return state;
  }
};
export default textReducer;