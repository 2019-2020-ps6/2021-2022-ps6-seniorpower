import {ColorStyle} from "../models/colorstyle.model";

export const DEFAULT_COLOR:ColorStyle = {
  font: {
    colorLoupe: "rgb(230,255,255)",
    colorTrue: "#92C746", //ou #74A529
    colorFalse: "#ea9999" ,//ou #D12F11 ou #FF6119
    colorScript: "#c8cbee",
    colorNext:"white",
    colorAfficher:"#50DBB4",
    colorText: "black",
    colorJouer:"rgba(59, 234, 162, 0.62)",
    colorSuppr:"rgba(232, 78, 78, 0.66)",
    colorModif:"rgba(200, 160, 229, 0.73)",
    connexionColor: "rgba(224, 53, 53, 0.62)"//TODO & effects too
  },
}

export const PROTA_COLOR:ColorStyle = {
  font: {
    colorLoupe: "lightgreen",
    colorTrue: "#ff9900",
    colorFalse: "#8eaff6",
    colorScript:"#c8cbee",
    colorNext:"white",
    colorAfficher:"black",
    colorText: "black",
    colorJouer:"rgba(71,148,236,0.62)",
    colorSuppr:"rgba(238,158,41,0.66)",
    colorModif:"rgba(234,229,229,0.91)",
    connexionColor: "rgba(224, 53, 53, 0.62)"//TODO & effects too
  },
}

export const TRITA_COLOR:ColorStyle = {
  font: {
    colorLoupe: "rgb(230,255,255)",
    colorTrue: "#7fd3ec",
    colorFalse: "#e55f5f",
    colorScript:"#c8cbee",
    colorNext:"white",
    colorAfficher:"black",
    colorText: "black",
    colorJouer:"rgba(59, 234, 162, 0.62)",
    colorSuppr:"rgba(232, 78, 78, 0.66)",
    colorModif:"rgba(253,164,0,0.73)",
    connexionColor: "rgba(224, 53, 53, 0.62)"//TODO & effects too
  },
}

export const DEUTE_COLOR:ColorStyle = {
  font: {
    colorLoupe: "rgb(255,224,192)",
    colorTrue: "#ff9900",
    colorFalse: "#8eaff6",
    colorScript:"#c8cbee",
    colorNext:"white",
    colorAfficher:"black",
    colorText: "black",
    colorJouer:"rgba(14,182,243,0.65)",
    colorSuppr:"rgba(255,149,0,0.84)",
    colorModif:"rgba(0,255,225,0.73)",
    connexionColor: "rgba(224, 53, 53, 0.62)"//TODO & effects too
  },
}
