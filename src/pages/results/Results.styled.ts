import styled from 'styled-components';

export const Wrapper = styled.div<{ isGame?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.isGame ? '#ffc46c' : '#ff335f')};
  min-height: 100vh;

  padding: 18px;
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

export const Title = styled.h1`
  width: 100%;

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;

  margin-bottom: 20px;
`;

export const Current = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 7px;
  gap: 7px;

  background: #ffffff;
  border-radius: 20px;

  margin-bottom: 20px;
`;

export const Points = styled.div`
  width: 100%;

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #ff335f;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 20px;
  gap: 5px;

  background: #ffffff;
  border: 1px solid #ff335f;
  border-radius: 37px;
`;

export const Gift = styled.div`
  width: 100%;

  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 20px;
  gap: 30px;

  background: #ff335f;
  border-radius: 15px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Item = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 20px;
  gap: 7px;

  background: #ffffff;
  border-radius: 15px;
`;

export const Position = styled.div`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #ff335f;

  margin-right: 5px;
`;

export const Prize = styled.div`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #262727;

  width: 50%;
  text-transform: capitalize;
`;

export const Score = styled.div`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #ff335f;

  margin-left: auto;
`;

export const Empty = styled.div`
  font-family: 'Euclid';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 115%;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
