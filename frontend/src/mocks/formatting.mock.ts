import {Formatting} from "../models/formatting.model";

export const CLASSIC_Format:Formatting = {
  textAlign:"center",
  marginLeft: "none",
  marginRight: "none",
  width: "auto",
  justifyContent: "space-evenly",
  justifyContentOptions: "space-evenly",
  justifyContentTheme: "revert",
  columnCount:"none",
  flexDirection: "none",
  alignItems: "none",
}

export const DMLA_FORMAT:Formatting = {
  marginLeft: "none",
  marginRight: "none",
  width:"100%",
  flexWrap:"nowrap",
  justifyContent:"start",
  size:"40%",
  justifyContentOptions: "start",
  justifyContentTheme: "space-between",
  columnCount:"1",
  flexDirection: "column",
  alignItems: "start",

}

export const GLAUCOME_FORMAT:Formatting = {
  marginLeft: "auto",
  marginRight: "auto",
  width:"50%",
  textAlign:"center",
  justifyContent: "center",
  justifyContentOptions: "center",
  justifyContentTheme: "center",
  columnCount:"none",
  flexDirection: "none",
  alignItems: "none",
  flexWrap:"wrap"

}
