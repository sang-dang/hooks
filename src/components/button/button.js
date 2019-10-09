import React from 'react';
import { useStateValue } from '../../State';
import Button from '@material-ui/core/Button';
import { CHANGE_TEXT, CHANGE_BUTTON_COLOR } from '../../action/root.action';

const ThemedButton = () => {
  const [{button, text}, dispatch] = useStateValue();
  const clickMe = () => {
    dispatch({
      type: CHANGE_BUTTON_COLOR,
      newType: 'primary'
    })
    dispatch({
      type: CHANGE_TEXT,
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