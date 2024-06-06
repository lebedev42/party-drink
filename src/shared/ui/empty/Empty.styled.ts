import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 34px;
  color: #ffffff;
  width: 100%;

  margin: 40px 0px;

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 20px;

    margin: 20px 0px;
  }

  a {
    text-decoration: underline;

    &:visited {
      color: #ffffff;
    }
  }
`;
