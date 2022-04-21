import {Component, OnInit} from "@angular/core";
import {LoupeService} from "../../services/loupe.service";
import {FormattingService} from "../../services/formatting.service";
import {Formatting} from "../../models/formatting.model";
import {CLASSIC_Format} from "../../mocks/formatting.mock";
import {ColorService} from "../../services/color.service";
import {ColorStyle} from "../../models/colorstyle.model";
import { VariableService } from "src/services/variable.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  color:ColorStyle;
  formatting:Formatting = CLASSIC_Format;
  constructor(public loupeService:LoupeService, private formattingService:FormattingService,private colorService:ColorService,public variableService:VariableService) {
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    })
    this.colorService.getColorStyle().subscribe((color)=>{
      this.color = color;
    })
  }

  ngOnInit() {
    this.loupeService.setup();
  }

}
