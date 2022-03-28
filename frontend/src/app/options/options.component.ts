import { Component, OnInit } from '@angular/core';
import {ColorService} from "../../services/color.service";
import {ColorStyle} from "../../models/colorstyle.model";
import {DEFAULT_COLOR, DEUTE_COLOR, PROTA_COLOR, TRITA_COLOR} from "../../mocks/colorstyle.mock";
import {CLASSIC_Format,DMLA_FORMAT,GLAUCOME_FORMAT} from "../../mocks/formatting.mock";
import {Formatting} from "../../models/formatting.model";
import {FormattingService} from "../../services/formatting.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  colorStyle:ColorStyle = DEFAULT_COLOR;
  formatting:Formatting = CLASSIC_Format;

  constructor(public colorService: ColorService, public formattingService:FormattingService) { //TODO mettre partout où besoin
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    })
  }

  ngOnInit() {
  }

  changeColorDefault(){
    this.colorStyle = DEFAULT_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
  }

  changeColorProta(){
    this.colorStyle = PROTA_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
  }

  changeColorTrita(){
    this.colorStyle = TRITA_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
  }

  changeColorDeute(){
    this.colorStyle = DEUTE_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
  }
  // [style.color]="theme.font.color" pour changer le style-->

  changeFormatClassic(){
    this.formatting = CLASSIC_Format;
    this.colorService.colorUpdate(this.colorStyle);
  }

  changeFormatDMLA(){
    this.formatting = DMLA_FORMAT;
    this.colorService.colorUpdate(this.colorStyle);
  }

  changeFormatGlaucome(){
    this.formatting = GLAUCOME_FORMAT;
    this.colorService.colorUpdate(this.colorStyle);
  }

}
