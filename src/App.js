import React from 'react';
import { StateProvider } from './State';
import ThemedButton from './components/button/button';
import mainReducer from './reducers/root.reducer';
const App = () => {
  const initialState = {
    text: { text1: 'Hello' },
    button: {color1: 'secondary'}
  };
  
  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <ThemedButton></ThemedButton>
    </StateProvider>
  );
}

export default App;