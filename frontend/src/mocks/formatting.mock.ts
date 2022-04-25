import {Formatting} from "../models/formatting.model";

export const CLASSIC_Format:Formatting = {
  textAlign:"center",
  marginLeft: "none",
  marginRight: "none",
  width: "auto",
  justifyContent: "space-evenly",
  justifyContentOptions: "space-evenly",
  justifyContentTheme: "inherit"

}

export const DMLA_FORMAT:Formatting = {
  marginLeft: "none",
  marginRight: "none",
  width:"100%",
  flexWrap:"wrap",
  justifyContent:"space-between",
  size:"40%",
  justifyContentOptions: "start",
  justifyContentTheme: "space-between"

}

export const GLAUCOME_FORMAT:Formatting = {
  marginLeft: "auto",
  marginRight: "auto",
  width:"50%",
  textAlign:"center",
  justifyContent: "center",
  justifyContentOptions: "center",
  justifyContentTheme: "center"

}
