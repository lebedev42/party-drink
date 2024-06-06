import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 475px) {
    gap: 20px;
  }
  @media (max-width: 320px) {
    gap: 15px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  width: 100%;
  height: 100vh;

  padding: 80px 30px 70px;

  @media (max-width: 380px) {
    padding: 50px 20px 50px;
  }
  @media (max-width: 320px) {
    padding: 40px 10px 40px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 228px;
  height: 228px;
  object-fit: contain;

  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 115%;
  letter-spacing: -0.02em;

  color: #ffffff;

  margin-bottom: 10px;

  @media (max-width: 360px) {
    font-size: 20px;
  }
`;

export const SubTitle = styled.h1`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 115%;
  letter-spacing: -0.02em;

  color: #ffffff;

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
    props.typeBtn === 'white' ? '#FFFFFF' : '#ff335f'};
  color: ${(props) => (props.typeBtn === 'white' ? '#FF335F' : '#FFFFFF')};

  border: 1px solid #ffffff;

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-align: center;

  font-size: 18px;
  padding: 10px 16px;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0;
    cursor: not-allowed;
  }
`;
