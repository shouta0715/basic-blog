import * as React from "react";
import { G } from "react-native-svg";
import { Svg, Path, SvgProps } from "./styled";

const EyeIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 11.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" />
      <Path d="M15.956 7.887a2.253 2.253 0 0 1 0 2.226C15.009 11.785 12.794 14.5 9 14.5c-3.794 0-6.009-2.715-6.956-4.387a2.253 2.253 0 0 1 0-2.226C2.991 6.215 5.206 3.5 9 3.5c3.794 0 6.009 2.715 6.956 4.387Z" />
    </G>
  </Svg>
);

export { EyeIcon };
