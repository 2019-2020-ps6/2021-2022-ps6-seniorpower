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
  heightquestion:"10px",
  marginquestion:"10px",
  paddingquestion:"10px"
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
  heightquestion:"0px",
  marginquestion:"0px",
  paddingquestion:"0px"


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
  flexWrap:"wrap",
  heightquestion:"10px",
  marginquestion:"10px",
  paddingquestion:"10px"

}
