import { IconProps } from '../types';
import * as Styled from './PercentIcon.styled';

export const PercentIcon = ({ width, height, ...props }: IconProps) => (
  <Styled.Svg
    width={width}
    height={height}
    viewBox="0 0 95 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="0.133057"
      y="0.164917"
      width="94.8317"
      height="66.5548"
      rx="15.5191"
      fill="#9FC727"
    />
    <path
      d="M35.7024 49.1008L55.0521 19.1962"
      stroke="white"
      strokeWidth="3.17518"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse
      cx="35.7023"
      cy="24.0428"
      rx="6.9621"
      ry="6.25903"
      stroke="white"
      strokeWidth="3.17518"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse
      cx="56.6386"
      cy="42.8419"
      rx="6.9621"
      ry="6.25903"
      stroke="white"
      strokeWidth="3.17518"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Styled.Svg>
);
