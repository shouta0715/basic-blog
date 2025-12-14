import * as React from "react";
import { G } from "react-native-svg";
import { SvgProps, Svg, Path } from "./styled";

export const XIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M14 4 4 14M4 4l10 10" />
    </G>
  </Svg>
);
