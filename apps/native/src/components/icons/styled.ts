import { Path as ReactPath, Svg as ReactSvg } from "react-native-svg";
import { withUniwind } from "uniwind";

export const Path = withUniwind(ReactPath, {
  stroke: {
    fromClassName: "strokeClassName",
    styleProperty: "backgroundColor",
  },
});

export const Svg = withUniwind(ReactSvg, {
  color: {
    fromClassName: "className",
    styleProperty: "color",
  },
});

export type SvgProps = React.ComponentProps<typeof Svg>;
