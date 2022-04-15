import {Component, OnInit} from "@angular/core";
import {LoupeService} from "../../services/loupe.service";
import {FormattingService} from "../../services/formatting.service";
import {Formatting} from "../../models/formatting.model";
import {CLASSIC_Format} from "../../mocks/formatting.mock";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  formatting:Formatting = CLASSIC_Format;
  constructor(public loupeService:LoupeService, private formattingService:FormattingService) {
    this.formattingService.getFormatting().subscribe((format)=> {
      this.formatting = format;
    })
  }

  ngOnInit() {
    this.loupeService.setup();
  }

}
