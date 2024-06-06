import { IconProps } from '../types';
import * as Styled from './GiftIcon.styled';

export const GiftIcon = ({ width, height, ...props }: IconProps) => (
  <Styled.Svg
    width={width}
    height={height}
    viewBox="0 0 96 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="0.638672"
      y="0.164917"
      width="94.8317"
      height="66.5548"
      rx="15.5191"
      fill="#9FC727"
    />
    <rect
      x="31.7048"
      y="31.5022"
      width="32.6992"
      height="21.4056"
      stroke="white"
      strokeWidth="2.63329"
      strokeLinejoin="round"
    />
    <rect
      x="28.0178"
      y="23.5393"
      width="40.0733"
      height="7.96297"
      stroke="white"
      strokeWidth="2.63329"
      strokeLinejoin="round"
    />
    <rect
      x="52.0691"
      y="31.5022"
      width="21.4056"
      height="8.02885"
      transform="rotate(90 52.0691 31.5022)"
      stroke="white"
      strokeWidth="2.63329"
      strokeLinejoin="round"
    />
    <path
      d="M47.3296 23.2664C41.5034 20.8831 33.5331 17.9607 39.0271 12.6153C44.818 8.75456 47.7532 17.9408 47.3296 23.2664Z"
      stroke="white"
      strokeWidth="2.63329"
      strokeLinejoin="round"
    />
    <path
      d="M47.6956 23.3108C47.1764 14.1342 50.7654 6.99131 56.7239 10.1041C63.6096 14.6051 53.281 20.438 47.6956 23.3108Z"
      stroke="white"
      strokeWidth="2.63329"
      strokeLinejoin="round"
    />
  </Styled.Svg>
);
