import styled from 'styled-components';

export const Wrapper = styled.div<{ isGame?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.isGame ? '#ffc46c' : '#ff335f')};
  min-height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 80px 30px 70px;

  @media (max-width: 380px) {
    padding: 50px 20px 50px;
  }
  @media (max-width: 320px) {
    padding: 40px 10px 40px;
  }
`;

export const Title = styled.h1`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 115%;
  letter-spacing: -0.02em;

  color: #ffffff;

  margin-bottom: 20px;

  @media (max-width: 360px) {
    font-size: 20px;
  }
`;

export const Btn = styled.button<{ typeBtn: 'white' | 'red' }>`
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

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.02em;
  text-align: center;

  font-size: 18px;
  padding: 10px 16px;
  border-radius: 30px;

  width: 100%;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0;
    cursor: not-allowed;
  }
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Loader = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffffff;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;

  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;
