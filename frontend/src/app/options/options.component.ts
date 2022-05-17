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
  sizes:String[] = ["Petit","Moyen","Grand","Très grand"];
  colorList:String[] = ["Aucun","Protanopie","Tritanopie","Deutéranopie"];
  illnessList:String[] = ["Aucune","DMLA","Glaucome"];
  currentSize:string;
  currentIllness:string;
  currentColor:string;

  constructor(public colorService: ColorService, public formattingService:FormattingService,public loupeService:LoupeService,public policeStyleService:PoliceStyleService) { //TODO mettre partout où besoin
    this.colorService.getColorStyle().subscribe((color) => {
      this.colorStyle = color;
    });
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    });
    this.policeStyleService.getPoliceStyle().subscribe((police) => {
      this.police = police;
    });
    this.colorService.getCurrentColor().subscribe((current)=>{
      this.currentColor = current;
    });
    this.formattingService.getCurrentSize().subscribe((size)=>{
      this.currentSize = size;
    });
    this.formattingService.getCurrentIllness().subscribe((illness)=>{
      this.currentIllness = illness;
    });
  }

  ngOnInit() {
    this.loupeService.setup();
  }

  changeColorDefault(){
    this.colorStyle = DEFAULT_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Aucun");
  }

  changeColorProta(){
    this.colorStyle = PROTA_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Protanopie");

  }

  changeColorTrita(){
    this.colorStyle = TRITA_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Tritanopie");

  }

  changeColorDeute(){
    this.colorStyle = DEUTE_COLOR;
    this.colorService.colorUpdate(this.colorStyle);
    this.colorService.currentColorUpdate("Deutéranopie");

  }

  changeFormatClassic(){
    this.formatting = CLASSIC_Format;
    this.formattingService.formattingUpdate(this.formatting);
    this.formattingService.changeIllness("Aucune");
  }

  changeFormatDMLA(){
    this.formatting = DMLA_FORMAT;
    this.formattingService.formattingUpdate(this.formatting);
    this.formattingService.changeIllness("DMLA");

  }

  changeFormatGlaucome(){
    this.formatting = GLAUCOME_FORMAT;
    this.formattingService.formattingUpdate(this.formatting);
    this.formattingService.changeIllness("Glaucome");

  }

  getAllSize(){
    return this.sizes
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

  applySizeChange(){
    const size: string = (document.getElementById('size') as HTMLInputElement).value;
    switch (size){
      case "Petit":{
        document.documentElement.style.setProperty(`--font-size`, 18 + 'px');
        break;
      }
      case "Moyen":{
        document.documentElement.style.setProperty(`--font-size`, 22 + 'px');
        break;
      }
      case "Grand":{
        document.documentElement.style.setProperty(`--font-size`, 24 + 'px');
        break;
      }
      case "Très grand":{
        document.documentElement.style.setProperty(`--font-size`, 30 + 'px');
        break;
      }
    }
    this.formattingService.changeSize(size);
  }
}
