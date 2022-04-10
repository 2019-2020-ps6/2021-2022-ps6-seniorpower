import {ColorStyle} from "../models/colorstyle.model";

export const DEFAULT_COLOR:ColorStyle = {
  font: {
    colorLoupe: "rgb(230,255,255)",
    colorTrue: "#92C746", //ou #74A529
    colorFalse: "#ea9999" //ou #D12F11 ou #FF6119
  },
}

export const PROTA_COLOR:ColorStyle = {
  font: {
    colorLoupe: "lightgreen",
    colorTrue: "#ff9900",
    colorFalse: "#8eaff6"
  },
}

export const TRITA_COLOR:ColorStyle = {
  font: {
    colorLoupe: "rgb(230,255,255)",
    colorTrue: "#7fd3ec",
    colorFalse: "#e55f5f"
  },
}

export const DEUTE_COLOR:ColorStyle = {
  font: {
    colorLoupe: "rgb(255,224,192)",
    colorTrue: "#ff9900",
    colorFalse: "#8eaff6"
  },
}
