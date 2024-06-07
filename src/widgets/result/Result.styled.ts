import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  padding: 20px;

  @media (max-width: 380px) {
    padding: 10px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  width: 100%;

  background: #ffffff;
  border-radius: 20px;
  padding: 27px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 303px;
  height: 267px;
  object-fit: contain;

  margin-bottom: 22px;
`;

export const SubTitle = styled.h1`
  font-family: 'Euclid';

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;

  color: #000000;

  text-align: center;

  margin-bottom: 20px;

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  flex-direction: column;

  button:first-child {
    margin-bottom: 10px;
  }
`;

export const Btn = styled.button<{ typeBtn: 'white' | 'red' }>`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  opacity: 1;

  background-color: ${(props) =>
    props.typeBtn === 'white' ? '#FFD8EE' : '#ff4fc3'};
  color: ${(props) => (props.typeBtn === 'white' ? '#3E373A' : '#FFFFFF')};

  border-radius: 14px;

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-align: center;

  font-size: 18px;
  padding: 10px 16px;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0;
    cursor: not-allowed;
  }
`;
