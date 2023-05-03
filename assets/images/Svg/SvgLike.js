import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgLike = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF6C00"
      d="M11.365 6.6h-.5a.5.5 0 0 0 .5.5v-.5Zm0-3.2h.5-.5ZM8.773 1V.5a.5.5 0 0 0-.45.284l.45.216ZM5.32 8.2l-.451-.216a.5.5 0 0 0-.05.216h.5Zm0 8.8h-.5a.5.5 0 0 0 .5.5V17Zm9.742 0 .005-.5h-.005v.5Zm1.728-1.36-.494-.082v.001l.494.08Zm1.191-7.2.494.082V8.52l-.494-.081ZM16.253 6.6v.5h.005l-.005-.5ZM5.32 17v.5a.5.5 0 0 0 .5-.5h-.5Zm0-8.8h.5a.5.5 0 0 0-.5-.5v.5Zm6.546-1.6V3.4h-1v3.2h1Zm0-3.2c0-1.637-1.421-2.9-3.092-2.9v1c1.192 0 2.092.886 2.092 1.9h1ZM8.323.784l-3.455 7.2.901.432 3.455-7.2-.901-.432ZM4.819 8.2V17h1V8.2h-1Zm.5 9.3h9.742v-1H5.32v1Zm9.737 0c1.08.011 2.053-.72 2.226-1.78l-.987-.16c-.085.517-.585.947-1.229.94l-.01 1Zm2.226-1.778 1.192-7.2-.987-.164-1.192 7.2.987.164Zm1.192-7.201a2.02 2.02 0 0 0-.533-1.713l-.73.684c.231.245.326.562.276.867l.987.162Zm-.533-1.713a2.29 2.29 0 0 0-1.693-.708l.01 1a1.29 1.29 0 0 1 .954.392l.729-.684ZM16.253 6.1h-4.888v1h4.888v-1ZM5.32 16.5H2.727v1H5.32v-1Zm-2.592 0c-.714 0-1.227-.528-1.227-1.1h-1c0 1.195 1.034 2.1 2.227 2.1v-1ZM1.5 15.4V9.8h-1v5.6h1Zm0-5.6c0-.572.513-1.1 1.227-1.1v-1C1.534 7.7.5 8.605.5 9.8h1Zm1.227-1.1H5.32v-1H2.727v1Zm2.092-.5V17h1V8.2h-1Z"
    />
  </Svg>
);
export default SvgLike;