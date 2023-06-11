import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SvgRemoveProfilePhoto = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      fill="none"
      {...props}
    >
      <Circle cx={12.5} cy={12.5} r={12} fill="#fff" stroke="#E8E8E8" />
      <Path
        fill="#BDBDBD"
        fillRule="evenodd"
        d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
        clipRule="evenodd"
        transform="rotate(-45 12.5 12.5)"
      />
    </Svg>
  );
};
export default SvgRemoveProfilePhoto;