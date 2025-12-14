import * as React from "react";
import { Svg, Path, SvgProps } from "./styled";

export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <Path
      d="M10.922 2.13a.75.75 0 0 0-1.042.198l-4.25 6.25a.751.751 0 0 0 0 .844l4.25 6.25a.751.751 0 0 0 1.042.198.749.749 0 0 0 .198-1.042L7.157 9l3.963-5.828a.75.75 0 0 0-.198-1.042Z"
      fill="currentColor"
    />
  </Svg>
);
