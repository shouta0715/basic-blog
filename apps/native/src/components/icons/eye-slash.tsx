import * as React from "react";
import { G } from "react-native-svg";
import { Svg, Path, SvgProps } from "./styled";

const EyeSlashIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M4.808 13.192c-1.34-.925-2.243-2.16-2.764-3.079a2.253 2.253 0 0 1 0-2.226C2.991 6.215 5.205 3.5 9 3.5c1.708 0 3.096.55 4.192 1.308M15.327 6.915c.251.343.46.674.629.972a2.253 2.253 0 0 1 0 2.226C15.009 11.785 12.794 14.5 9 14.5c-.408 0-.797-.031-1.168-.09" />
      <Path
        d="M7.056 10.945a2.75 2.75 0 1 1 3.889-3.89M2 16 16 2"
        data-color="color-2"
      />
    </G>
  </Svg>
);
export { EyeSlashIcon };
