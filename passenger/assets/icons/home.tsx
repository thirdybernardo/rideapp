import Svg, {Path} from 'react-native-svg';
import React from 'react';

export function Home({
  colors,
  width,
  height,
}: {
  colors: string;
  width: number;
  height: number;
}) {
  return (
    <Svg
      width={width || '14'}
      height={height || '14'}
      viewBox="0 0 14 14"
      fill="none">
      <Path
        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
        fill={colors || 'white'}
        stroke={colors || 'white'}
      />
    </Svg>
  );
}
