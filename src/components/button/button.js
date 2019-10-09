import React from 'react';
import { useStateValue } from '../../State';
import Button from '@material-ui/core/Button';

const ThemedButton = () => {
  const [{button, text}, dispatch] = useStateValue();
  const clickMe = () => {
    dispatch({
      type: 'changeButton',
      newType: 'primary'
    })
    dispatch({
      type: 'changeText',
      newText: 'New Text'
    })
  }
  return (
    <Button
      color={button.color1}
      variant='contained'
      onClick={clickMe}
    >
      {text.text1}
    </Button>
  );
}
export default ThemedButton;