import { Component, OnInit } from '@angular/core';
import {ColorService} from "../../services/color.service";
import {ColorStyle} from "../../models/colorstyle.model";
import {DEFAULT_COLOR, DEUTE_COLOR, PROTA_COLOR, TRITA_COLOR} from "../../mocks/colorstyle.mock";
import {CLASSIC_Format,DMLA_FORMAT,GLAUCOME_FORMAT} from "../../mocks/formatting.mock";
import {Formatting} from "../../models/formatting.model";
import {FormattingService} from "../../services/formatting.service";
import {LoupeService} from "../../services/loupe.service";
import {PoliceStyle} from "../../models/PoliceStyle.model";
import {Arial_Police, CLASSIC_Police, Verdana_Police} from "../../mocks/PoliceStyle.mock";
import {PoliceStyleService} from "../../services/policeStyle.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  colorStyle:ColorStyle = DEFAULT_COLOR;
  formatting:Formatting = CLASSIC_Format;
  police: PoliceStyle = CLASSIC_Police;
  sizes:String[];
  colorList:String[];
  illnessList:String[];

  constructor(public colorService: ColorService, public formattingService:FormattingService,public loupeService:LoupeService,public policeStyleService:PoliceStyleService) { //TODO mettre partout où besoin
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    })
    this.policeStyleService.getPoliceStyle().subscribe((police) => {
      this.police = police;
    });
    this.sizes = ["15","16","17","18","19","20","21","22"];
    this.colorList = ["Aucun","Protanopie","Tritanopie","Deutéranopie"];
    this.illnessList = ["Aucune","DMLA","Glaucome"];
  }

  ngOnInit() {
    this.loupeService.setup();
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

  changeFormatClassic(){
    this.formatting = CLASSIC_Format;
    this.formattingService.formattingUpdate(this.formatting);
  }

  changeFormatDMLA(){
    this.formatting = DMLA_FORMAT;
    this.formattingService.formattingUpdate(this.formatting);
  }

  changeFormatGlaucome(){
    this.formatting = GLAUCOME_FORMAT;
    this.formattingService.formattingUpdate(this.formatting);
  }

  applySizeChange(){
    const size: string = (document.getElementById('size') as HTMLInputElement).value;
    document.documentElement.style.setProperty(`--font-size`, size + 'px');
  }

  getAllSize(){
    return this.sizes
  }
  changeArial(){
    this.police=Arial_Police;
    this.policeStyleService.PoliceUpdate(this.police)
  }
  changeVerdana(){
    this.police=Verdana_Police;
    this.policeStyleService.PoliceUpdate(this.police)
  }

  getAllColors(){
    return this.colorList;
  }

  applyColorChange(){
    const color: string = (document.getElementById('color') as HTMLInputElement).value;
    switch (color){
      case "Aucun":{
        this.changeColorDefault();
        break;
      }
      case "Protanopie":{
        this.changeColorProta();
        break;
      }
      case "Tritanopie":{
        this.changeColorTrita();
        break;
      }
      case "Deutéranopie":{
        this.changeColorDeute();
        break;
      }
    }
  }

  getAllIllness(){
    return this.illnessList;
  }

  applyIllnessChange(){
    const illness: string = (document.getElementById('illness') as HTMLInputElement).value;
    switch (illness){
      case "Aucune":{
        this.changeFormatClassic();
        break;
      }
      case "DMLA":{
        this.changeFormatDMLA();
        break;
      }
      case "Glaucome":{
        this.changeFormatGlaucome();
        break;
      }
    }
  }
}
