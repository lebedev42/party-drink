import React from 'react';
import * as Styled from './Btn.styled';

type BtnProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  type: 'white' | 'green';
};

export const Btn: React.FC<BtnProps> = (props) => {
  const { label, disabled, onClick, type } = props;

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <Styled.Btn
      onClick={handleClick}
      className={disabled ? 'disabled' : ''}
      typeBtn={type}
    >
      {props.label}
    </Styled.Btn>
  );
};
