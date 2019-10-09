import textReducer from './text.reducer';
import buttonReducer from './button.reducer';

const mainReducer = ({ button, text }, action) => ({
  button: buttonReducer(button, action),
  text: textReducer(text, action)
});
export default mainReducer;