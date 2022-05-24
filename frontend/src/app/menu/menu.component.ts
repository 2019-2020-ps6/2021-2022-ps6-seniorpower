import {Component, OnInit} from "@angular/core";
import {LoupeService} from "../../services/loupe.service";
import {FormattingService} from "../../services/formatting.service";
import {Formatting} from "../../models/formatting.model";
import {ColorService} from "../../services/color.service";
import {ColorStyle} from "../../models/colorstyle.model";
import { VariableService } from "src/services/variable.service";
import {DEFAULT_COLOR, DEUTE_COLOR, PROTA_COLOR, TRITA_COLOR} from "../../mocks/colorstyle.mock";
import {CLASSIC_Format,DMLA_FORMAT,GLAUCOME_FORMAT} from "../../mocks/formatting.mock";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  colorStyle:ColorStyle;
  formatting:Formatting = CLASSIC_Format;
  constructor(public loupeService:LoupeService, private formattingService:FormattingService,private colorService:ColorService,public variableService:VariableService) {
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
      console.log(this.formatting);
      
    })
    this.colorService.getColorStyle().subscribe((color)=>{
      this.colorStyle = color;
      console.log(this.colorStyle);
    })
  }

  ngOnInit() {
    this.loupeService.setup();
  }


}
