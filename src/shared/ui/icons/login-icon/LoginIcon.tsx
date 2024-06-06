import { IconProps } from '../types';
import * as Styled from './LoginIcon.styled';

export const LoginIcon = ({ width, height, ...props }: IconProps) => (
  <Styled.Svg
    width={width}
    height={height}
    viewBox="0 0 18 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.14836 16.833C7.88841 16.8365 6.64437 16.5514 5.51169 15.9996C5.09715 15.798 4.69996 15.5624 4.32419 15.2954L4.21002 15.2121C3.17654 14.4493 2.33159 13.4598 1.74002 12.3196C1.12814 11.1395 0.810781 9.82889 0.814983 8.49959C0.814983 3.89722 4.54598 0.16626 9.14836 0.16626C13.7507 0.16626 17.4817 3.89722 17.4817 8.49959C17.4859 9.82825 17.1688 11.1382 16.5575 12.3179C15.9668 13.4575 15.123 14.4466 14.0909 15.2096C13.7015 15.4946 13.2883 15.7455 12.8559 15.9596L12.7892 15.9929C11.6558 16.5477 10.4102 16.8351 9.14836 16.833ZM9.14836 12.6662C7.89959 12.6638 6.75474 13.3613 6.18419 14.4721C8.05202 15.3972 10.2447 15.3972 12.1125 14.4721V14.4679C11.5413 13.3583 10.3964 12.6624 9.14836 12.6662ZM9.14836 10.9996C10.9535 11.0019 12.6179 11.9747 13.5059 13.5463L13.5184 13.5354L13.53 13.5254L13.5159 13.5379L13.5075 13.5446C15.615 11.7238 16.3686 8.78487 15.3972 6.17468C14.4259 3.56449 11.9343 1.83319 9.14919 1.83319C6.36411 1.83319 3.87252 3.56449 2.90115 6.17468C1.92978 8.78487 2.68336 11.7238 4.79086 13.5446C5.67941 11.9738 7.34366 11.0018 9.14836 10.9996ZM9.14836 10.1663C7.30741 10.1663 5.81502 8.67388 5.81502 6.83293C5.81502 4.99198 7.30741 3.49959 9.14836 3.49959C10.9893 3.49959 12.4817 4.99198 12.4817 6.83293C12.4817 7.71698 12.1305 8.56483 11.5054 9.18995C10.8803 9.81507 10.0324 10.1663 9.14836 10.1663ZM9.14836 5.16626C8.22788 5.16626 7.48169 5.91245 7.48169 6.83293C7.48169 7.7534 8.22788 8.49959 9.14836 8.49959C10.0688 8.49959 10.815 7.7534 10.815 6.83293C10.815 5.91245 10.0688 5.16626 9.14836 5.16626Z"
      fill="#80BA27"
    />
  </Styled.Svg>
);
