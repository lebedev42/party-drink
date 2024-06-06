import styled from 'styled-components';

export const Btn = styled.button<{ typeBtn: 'white' | 'green' }>`
  display: flex;

  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 17px 18px;
  gap: 5px;

  background: ${(props) => (props.typeBtn === 'white' ? '#FFFFFF' : '#80BA27')};
  border-radius: 14px;

  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 29px;
  text-align: center;

  color: ${(props) => (props.typeBtn === 'white' ? '#000000' : '#FAFFF7')};

  font-size: 16px;
  padding: 10px 30px;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    background: #b6b6b6;
    cursor: not-allowed;
  }
`;
