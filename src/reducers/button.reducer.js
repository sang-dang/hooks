const buttonReducer = (state, action) => {
  switch (action.type) {
    case 'changeButton':
      return {
        ...state,
        color1: action.newType
      };  

    default:
      return state;
  }
};
export default buttonReducer;